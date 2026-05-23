import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@realworld/core/http-client';
import { RosterResponse } from '@realworld/core/api-types';

@Injectable({ providedIn: 'root' })
export class RosterService {
  constructor(private readonly apiService: ApiService) {}

  getRoster(): Observable<RosterResponse> {
    return this.apiService.get<RosterResponse>('/roster');
  }
}
