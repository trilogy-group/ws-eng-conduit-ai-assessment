import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllUsers, getArticle, heartbeatArticle, lockArticle, unlockArticle, updateArticle } from '../../../services/conduit';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import { initializeEditor, loadArticle, setCoAuthorIds, setUsers, startSubmitting, updateErrors } from '../../ArticleEditor/ArticleEditor.slice';

export function EditArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { loading } = useStore(({ editor }) => editor);

  useEffect(() => {
    _loadArticle(slug!);
    return () => {
      // Cleanup: clear heartbeat and unlock when leaving page
      const anyWin = window as any;
      if (anyWin.__articleLockInterval) {
        clearInterval(anyWin.__articleLockInterval);
        anyWin.__articleLockInterval = null;
      }
      if (slug) {
        unlockArticle(slug).catch(() => void 0);
      }
    };
  }, [slug]);

  return <Fragment>{!loading && <ArticleEditor onSubmit={onSubmit(slug!)} />}</Fragment>;
}

async function _loadArticle(slug: string) {
  store.dispatch(initializeEditor());
  try {
    const article = await getArticle(slug);
    const me = store.getState().app.user;
    const isCoAuthor = article.coAuthors?.some((u) => u.username === me?.username);
    if (article.author.username !== me?.username && !isCoAuthor) {
      location.hash = '#/';
      return;
    }

    // Attempt to acquire lock
    try {
      await lockArticle(slug);
    } catch (e) {
      // If cannot acquire, show error and redirect
      alert('This article is currently locked by another user. Please try again later.');
      location.hash = `#/article/${slug}`;
      return;
    }

    // Prefill article fields and coAuthorIds
    store.dispatch(
      loadArticle({ title: article.title, description: article.description, body: article.body, tagList: article.tagList }),
    );
    if (article.coAuthors?.length) {
      store.dispatch(setCoAuthorIds(article.coAuthors.map((u) => u.id)));
    }

    // Load users for multi-select
    getAllUsers().then((users) => store.dispatch(setUsers(users)));

    // Start heartbeat
    const interval = setInterval(
      () =>
        heartbeatArticle(slug).catch(() => {
          alert('You lost the edit lock for this article. Redirecting to view page.');
          clearInterval(interval);
          location.hash = `#/article/${slug}`;
        }),
      30000,
    );
    (window as any).__articleLockInterval = interval;
    // Release lock on unload
    window.addEventListener('beforeunload', () => unlockArticle(slug));
  } catch {
    location.hash = '#/';
  }
}

function onSubmit(slug: string): (ev: React.FormEvent) => void {
  return async (ev) => {
    ev.preventDefault();

    store.dispatch(startSubmitting());
    const result = await updateArticle(slug, store.getState().editor.article);

    result.match({
      err: (errors) => store.dispatch(updateErrors(errors)),
      ok: ({ slug }) => {
        unlockArticle(slug);
        location.hash = `#/article/${slug}`;
      },
    });
  };
}
