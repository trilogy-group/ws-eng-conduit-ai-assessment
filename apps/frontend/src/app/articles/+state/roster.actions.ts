// src/app/articles/+state/roster.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadRoster = createAction('[Roster] Load Roster');
export const loadRosterSuccess = createAction('[Roster] Load Roster Success', props<{ roster: any[] }>());
export const loadRosterFailure = createAction('[Roster] Load Roster Failure', props<{ error: any }>());
