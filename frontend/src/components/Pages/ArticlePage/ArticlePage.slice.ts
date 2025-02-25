import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../../types/article';
import { Comment } from '../../../types/comment';
import { Profile } from '../../../types/profile';

export interface CommentSectionState {
  comments: Comment[];
  commentBody: string;
  submittingComment: boolean;
}

export interface MetaSectionState {
  submittingFavorite: boolean;
  submittingFollow: boolean;
  deletingArticle: boolean;
}

export interface ArticlePageState {
  article: Article | null;
  commentSection: CommentSectionState;
  metaSection: MetaSectionState;
}

const initialState: ArticlePageState = {
  article: null,
  commentSection: {
    comments: [],
    commentBody: '',
    submittingComment: false,
  },
  metaSection: {
    submittingFavorite: false,
    submittingFollow: false,
    deletingArticle: false,
  },
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    initializeArticlePage: () => initialState,
    loadArticle: (state, { payload: article }: PayloadAction<Article>) => {
      state.article = article;
      state.metaSection.submittingFavorite = false;
    },
    loadComments: (state, { payload: comments }: PayloadAction<Comment[]>) => {
      state.commentSection.comments = comments;
      state.commentSection.commentBody = '';
      state.commentSection.submittingComment = false;
    },
    updateAuthor: (state, { payload: author }: PayloadAction<Profile>) => {
      state.article = state.article ? { ...state.article, author } : null;
      state.metaSection.submittingFollow = false;
    },
    startSubmittingFavorite: (state) => {
      state.metaSection.submittingFavorite = true;
    },
    startSubmittingFollow: (state) => {
      state.metaSection.submittingFollow = true;
    },
    updateCommentBody: (state, { payload: commentBody }: PayloadAction<string>) => {
      state.commentSection.commentBody = commentBody;
    },
    startSubmittingComment: (state) => {
      state.commentSection.submittingComment = true;
    },
    startDeletingArticle: (state) => {
      state.metaSection.deletingArticle = true;
    },
  },
});

export const {
  initializeArticlePage,
  loadArticle,
  loadComments,
  updateAuthor,
  startSubmittingFavorite,
  startSubmittingFollow,
  updateCommentBody,
  startSubmittingComment,
  startDeletingArticle,
} = slice.actions;

export default slice.reducer;
