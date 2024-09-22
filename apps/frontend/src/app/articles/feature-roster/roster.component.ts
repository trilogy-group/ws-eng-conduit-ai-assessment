// src/app/articles/feature-roster/roster.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadRoster } from '../+state/roster.actions';
import { selectRoster, selectRosterLoading } from '../+state/roster.selectors';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
})
export class RosterComponent implements OnInit {
  roster$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.roster$ = this.store.select(selectRoster);
    this.loading$ = this.store.select(selectRosterLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadRoster());
  }
}
