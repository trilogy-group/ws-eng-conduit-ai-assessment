import { Injectable } from '@angular/core';
import { ApiService } from '@realworld/core/http-client';
import { Observable, map } from 'rxjs';
import { RosterItem, RosterResponse } from '@realworld/core/api-types';

@Injectable({ providedIn: 'root' })
export class RosterService {
  constructor(private api: ApiService) {}

  getRoster(): Observable<RosterItem[]> {
    return this.api.get<RosterResponse>('/roster').pipe(map((res) => res.roster ?? []));
  }
}
