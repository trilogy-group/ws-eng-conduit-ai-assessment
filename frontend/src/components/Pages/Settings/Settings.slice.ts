import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';
import { GenericErrors } from '../../../types/error';
import { UserSettings } from '../../../types/user';
import { loadUser, logout } from '../../App/App.slice';

export interface SettingsState {
  user: UserSettings;
  errors: GenericErrors;
  updating: boolean;
}

const initialState: SettingsState = {
  user: { username: '', email: '', password: null, bio: null, image: null },
  errors: {},
  updating: false,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    initializeSettings: () => initialState,
    updateField: (state, { payload: { name, value } }: PayloadAction<{ name: keyof UserSettings; value: string }>) => {
      state.user[name] = value;
    },
    updateErrors: (state, { payload: errors }: PayloadAction<GenericErrors>) => {
      state.errors = errors;
      state.updating = false;
    },
    startUpdate: (state) => {
      state.updating = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser, (state, { payload: user }) => {
        state.user = { ...R.dissoc('token')(user), password: null };
        state.updating = false;
      })
      .addCase(logout, () => initialState);
  },
});

export const { initializeSettings, updateField, updateErrors, startUpdate } = slice.actions;

export default slice.reducer;
