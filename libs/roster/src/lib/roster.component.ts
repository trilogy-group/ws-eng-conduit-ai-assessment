import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: [],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class RosterComponent implements OnInit {
  users: Array<{ id: number; username: string; email: string }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Array<{ id: number; username: string; email: string }>>('/api/roster')
      .subscribe(data => {
        this.users = data;
      });
  }
}
