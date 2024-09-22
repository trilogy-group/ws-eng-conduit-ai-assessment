// src/app/articles/article.routes.ts
import { Routes } from '@angular/router';
import { RosterComponent } from './feature-roster/roster.component';

export const articleRoutes: Routes = [
  // other routes
  { path: 'roster', component: RosterComponent },
];
