import { FormEvent, useEffect } from 'react';
import { createArticle, getAllUsers } from '../../../services/conduit';
import { store } from '../../../state/store';
import { ArticleEditor } from '../../ArticleEditor/ArticleEditor';
import { initializeEditor, setUsers, startSubmitting, updateErrors } from '../../ArticleEditor/ArticleEditor.slice';

export function NewArticle() {
  useEffect(() => {
    store.dispatch(initializeEditor());
    // Load users for advanced co-author selection
    getAllUsers().then((users) => store.dispatch(setUsers(users)));
  }, [null]);

  return <ArticleEditor onSubmit={onSubmit} />;
}

async function onSubmit(ev: FormEvent) {
  ev.preventDefault();
  store.dispatch(startSubmitting());
  const result = await createArticle(store.getState().editor.article);

  result.match({
    err: (errors) => store.dispatch(updateErrors(errors)),
    ok: ({ slug }) => {
      location.hash = `#/article/${slug}`;
    },
  });
}
