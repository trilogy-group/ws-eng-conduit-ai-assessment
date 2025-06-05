import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

interface RosterUser {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'realworld-roster',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './roster.component.html'
})
export class RosterComponent implements OnInit {
  users$!: Observable<RosterUser[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.users$ = this.http.get<RosterUser[]>('/api/roster');
  }
}
