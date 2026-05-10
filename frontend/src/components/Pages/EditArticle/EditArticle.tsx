import React, { Fragment, useEffect, useState } from 'react';
import { acquireLock, releaseLock } from '../../../services/conduit';
import { useParams } from 'react-router-dom';
import { getArticle, updateArticle } from '../../../services/conduit';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import { initializeEditor, loadArticle, startSubmitting, updateErrors } from '../../ArticleEditor/ArticleEditor.slice';

export function EditArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { loading } = useStore(({ editor }) => editor);
  const [lockAcquired, setLockAcquired] = useState(false);
  const [lockError, setLockError] = useState<string | null>(null);

  useEffect(() => {
    async function handleLock() {
      const lockResponse = await acquireLock(slug!);
      if (!lockResponse.success) {
        setLockError(`This article is currently being edited by ${lockResponse.lockedBy}. Please try again later.`);
        return;
      }
      setLockAcquired(true);
      _loadArticle(slug!);
    }

    handleLock();
    return () => {
      if (lockAcquired) {
        releaseLock(slug!);
      }
    };
  }, [slug]);

  return (
    <Fragment>
      {lockError && <div style={{ color: 'red', textAlign: 'center' }}>{lockError}</div>}
      {!loading && lockAcquired && <ArticleEditor onSubmit={onSubmit(slug!)} />}
    </Fragment>
  );
}

async function _loadArticle(slug: string) {
  store.dispatch(initializeEditor());
  try {
    const { title, description, body, tagList, author } = await getArticle(slug);

    if (author.username !== store.getState().app.user?.username) {
      location.hash = '#/';
      return;
    }

    store.dispatch(loadArticle({ title, description, body, tagList }));
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
        location.hash = `#/article/${slug}`;
      },
    });
  };
}
