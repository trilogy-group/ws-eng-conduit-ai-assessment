import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { articleEditActions } from './article-edit.actions';

export const publishArticle$ = createEffect(
  (
    actions$ = inject(Actions),
    articlesService = inject(ArticlesService),
    store = inject(Store),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) => {
        console.log('Data before transformation:', data); // Log the data before transformation
        // Ensure tagList is an array before publishing
        const transformedData = {
          ...data,
          tagList: Array.isArray(data.tagList)
            ? data.tagList.map((tag: string) => tag.trim())
            : typeof data.tagList === 'string'
            ? data.tagList.split(',').map((tag: string) => tag.trim()) // Split the string into an array if it's a comma-separated string
            : [], // Default to an empty array if tagList is invalid
        };

        console.log('Transformed data being published:', transformedData); // Log the transformed data

        return articlesService.publishArticle(transformedData).pipe(
          tap((result) => router.navigate(['article', result.article.slug])),
          map(() => articleEditActions.publishArticleSuccess()),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        );
      }),
    );
  },
  { functional: true },
);
