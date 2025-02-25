import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

export interface AppState {
  user: User | null;
  loading: boolean;
}

const initialState: AppState = {
  user: null,
  loading: true,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: () => initialState,
    loadUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadUser, logout, endLoad, initializeApp } = slice.actions;

export default slice.reducer;
