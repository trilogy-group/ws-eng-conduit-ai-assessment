// src/app/articles/+state/roster.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RosterState } from './roster.reducer';

export const selectRosterState = createFeatureSelector<RosterState>('roster');

export const selectRoster = createSelector(selectRosterState, (state: RosterState) => state.roster);
export const selectRosterLoading = createSelector(selectRosterState, (state: RosterState) => state.loading);
