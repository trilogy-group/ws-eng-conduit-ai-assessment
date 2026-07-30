import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, shareReplay } from 'rxjs/operators';
import { RosterService } from './roster.service';
import { RosterItem } from '@realworld/core/api-types';

@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  providers: [],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class RosterComponent {
  loading$ = new BehaviorSubject<boolean>(true);
  roster$: Observable<RosterItem[]>;

  constructor(private rosterService: RosterService) {
    this.roster$ = this.rosterService
      .getRoster()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loading$.next(false)),
        shareReplay(1),
      );
  }

  trackById(index: number, item: RosterItem): number {
    return item.id;
  }
}
