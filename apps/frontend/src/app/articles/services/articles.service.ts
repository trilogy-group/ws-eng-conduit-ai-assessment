// src/app/articles/services/articles.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getRoster(): Observable<any[]> {
    return this.http.get<any[]>('/api/users/roster');
  }
}
