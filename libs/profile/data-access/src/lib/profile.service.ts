import { Profile, ProfileResponse } from '@realworld/core/api-types';
import { ApiService } from '@realworld/core/http-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private apiService: ApiService) {}

  getProfile(username: string): Observable<Profile> {
    // Encode username to safely handle spaces and special characters in the route param
    const encoded = encodeURIComponent(username);
    return this.apiService.get<ProfileResponse>('/profiles/' + encoded).pipe(map((data) => data.profile));
  }
}
