// src/app/articles/+state/roster.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as RosterActions from './roster.actions';

export interface RosterState {
  roster: any[];
  loading: boolean;
  error: any;
}

export const initialRosterState: RosterState = {
  roster: [],
  loading: false,
  error: null,
};

export const rosterReducer = createReducer(
  initialRosterState,
  on(RosterActions.loadRoster, state => ({ ...state, loading: true })),
  on(RosterActions.loadRosterSuccess, (state, { roster }) => ({ ...state, loading: false, roster })),
  on(RosterActions.loadRosterFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
