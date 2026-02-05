import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleForEditor, UserRef } from '../../types/article';
import * as R from 'ramda';
import { GenericErrors } from '../../types/error';

export interface EditorState {
  article: ArticleForEditor;
  tag: string;
  submitting: boolean;
  errors: GenericErrors;
  loading: boolean;
  users: UserRef[];
}

const initialState: EditorState = {
  article: { title: '', body: '', tagList: [], description: '' },
  tag: '',
  submitting: false,
  errors: {},
  loading: true,
  users: [],
};

const slice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    initializeEditor: () => initialState,
    updateField: (
      state,
      { payload: { name, value } }: PayloadAction<{
        name: 'title' | 'description' | 'body' | 'tag' | 'coAuthorEmailsCsv';
        value: string;
      }>,
    ) => {
      if (name === 'tag') {
        state.tag = value;
        return;
      }

      // Simple string fields on the article
      state.article[name] = value as unknown as never;
    },
    updateErrors: (state, { payload: errors }: PayloadAction<GenericErrors>) => {
      state.errors = errors;
      state.submitting = false;
    },
    setUsers: (state, { payload: users }: PayloadAction<UserRef[]>) => {
      state.users = users;
    },
    setCoAuthorIds: (state, { payload: ids }: PayloadAction<number[]>) => {
      state.article.coAuthorIds = ids;
    },
    startSubmitting: (state) => {
      state.submitting = true;
    },
    addTag: (state) => {
      if (state.tag.length > 0) {
        state.article.tagList.push(state.tag);
        state.tag = '';
      }
    },
    removeTag: (state, { payload: index }: PayloadAction<number>) => {
      state.article.tagList = R.remove(index, 1, state.article.tagList);
    },
    loadArticle: (state, { payload: article }: PayloadAction<ArticleForEditor>) => {
      state.article = article;
      state.loading = false;
    },
  },
});

export const { initializeEditor, updateField, startSubmitting, addTag, removeTag, updateErrors, loadArticle, setUsers, setCoAuthorIds } =
  slice.actions;

export default slice.reducer;
