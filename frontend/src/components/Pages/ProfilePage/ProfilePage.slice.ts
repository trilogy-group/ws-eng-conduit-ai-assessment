import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../../../types/profile';

export interface ProfilePageState {
  profile: Profile | null;
  submitting: boolean;
}

const initialState: ProfilePageState = {
  profile: null,
  submitting: false,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initializeProfile: () => initialState,
    loadProfile: (state, { payload: profile }: PayloadAction<Profile>) => {
      state.profile = profile;
      state.submitting = false;
    },
    startSubmitting: (state) => ({ ...state, submitting: true }),
  },
});

export const { initializeProfile, loadProfile, startSubmitting } = slice.actions;

export default slice.reducer;
