// src/app/articles/+state/roster.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ArticlesService } from '../services/articles.service';
import * as RosterActions from './roster.actions';

@Injectable()
export class RosterEffects {
  loadRoster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RosterActions.loadRoster),
      mergeMap(() =>
        this.articlesService.getRoster().pipe(
          map(roster => RosterActions.loadRosterSuccess({ roster })),
          catchError(error => of(RosterActions.loadRosterFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private articlesService: ArticlesService) {}
}
