import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, MultipleArticles } from '../../types/article';

export interface ArticleViewerArticle {
  article: Article;
  isSubmitting: boolean;
}

export interface ArticleViewerState {
  articles: ArticleViewerArticle[];
  currentPage: number;
  articlesCount: number;
}

const initialState: ArticleViewerState = {
  articles: [],
  currentPage: 1,
  articlesCount: 0,
};

const slice = createSlice({
  name: 'articleViewer',
  initialState,
  reducers: {
    startLoadingArticles: () => initialState,
    loadArticles: (state, { payload: { articles, articlesCount } }: PayloadAction<MultipleArticles>) => {
      state.articles = articles.map((article) => ({ article, isSubmitting: false }));
      state.articlesCount = articlesCount;
    },
    startSubmittingFavorite: (state, { payload: index }: PayloadAction<number>) => {
      state.articles = state.articles.map((article, i) => (i === index ? { ...article, isSubmitting: true } : article));
    },
    endSubmittingFavorite: (
      state,
      { payload: { article, index } }: PayloadAction<{ index: number; article: Article }>,
    ) => {
      state.articles = state.articles.map((a, i) => (i === index ? { article, isSubmitting: false } : a));
    },
    changePage: (state, { payload: page }: PayloadAction<number>) => {
      state.currentPage = page;
      state.articles = [];
    },
  },
});

export const { startLoadingArticles, loadArticles, startSubmittingFavorite, endSubmittingFavorite, changePage } =
  slice.actions;

export default slice.reducer;
