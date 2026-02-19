import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticle,
  updateArticle,
  lockArticle,
  unlockArticle,
} from '../../../services/conduit';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import {
  initializeEditor,
  loadArticle,
  startSubmitting,
  updateErrors,
} from '../../ArticleEditor/ArticleEditor.slice';

export function EditArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { loading } = useStore(({ editor }) => editor);

  useEffect(() => {
    _loadArticle(slug!);
    _lockArticle(slug!);

    return () => {
      _unlockArticle(slug!);
    };
  }, [slug]);

  return (
    <Fragment>
      {!loading && <ArticleEditor onSubmit={onSubmit(slug!)} />}
    </Fragment>
  );
}
async function _loadArticle(slug: string) {
  store.dispatch(initializeEditor());

  try {
    const { title, description, body, tagList } =
      await getArticle(slug);

    store.dispatch(loadArticle({ title, description, body, tagList }));
  } catch {
    location.hash = '#/';
  }
}
async function _lockArticle(slug: string) {
  try {
    await lockArticle(slug);
  } catch (err: any) {
    alert('This article is currently being edited by another user.');
    location.hash = `#/article/${slug}`;
  }
}
async function _unlockArticle(slug: string) {
  try {
    await unlockArticle(slug);
  } catch {
  }
}
function onSubmit(slug: string): (ev: React.FormEvent) => void {
  return async (ev) => {
    ev.preventDefault();

    store.dispatch(startSubmitting());

    const result = await updateArticle(
      slug,
      store.getState().editor.article,
    );

    result.match({
      err: (errors) => store.dispatch(updateErrors(errors)),
      ok: ({ slug }) => {
        location.hash = `#/article/${slug}`;
      },
    });
  };
}
