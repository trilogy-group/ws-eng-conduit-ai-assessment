import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RosterService } from './roster.service';
import { RosterResponse } from '@realworld/core/api-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: [],
  providers: [],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class RosterComponent {
  roster$: Observable<RosterResponse> = this.rosterService.getRoster();

  constructor(private readonly rosterService: RosterService) {}
}
