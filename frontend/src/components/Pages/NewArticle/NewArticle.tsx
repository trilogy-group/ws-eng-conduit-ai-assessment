import { FormEvent, useEffect } from 'react';
import { createArticle } from '../../../services/conduit';
import { store } from '../../../state/store';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import {
  initializeEditor,
  startSubmitting,
  updateErrors,
} from '../../ArticleEditor/ArticleEditor.slice';

export function NewArticle() {
  useEffect(() => {
    store.dispatch(initializeEditor());
  }, []);

  return <ArticleEditor onSubmit={onSubmit} />;
}

async function onSubmit(ev: FormEvent) {
  ev.preventDefault();

  store.dispatch(startSubmitting());

  const articleData = store.getState().editor.article;

  const result = await createArticle(articleData);

  result.match({
    err: (errors) => store.dispatch(updateErrors(errors)),
    ok: ({ slug }) => {
      location.hash = `#/article/${slug}`;
    },
  });
}
