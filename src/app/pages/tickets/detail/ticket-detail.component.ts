import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BackendService, Ticket } from '../../../services';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-tickets',
    templateUrl: './ticket-detail.component.html',
    styleUrls: [ './ticket-detail.component.css' ]
})
export class TicketDetailComponent implements OnInit {

    ticket$: Observable<Ticket>;

    constructor(private activeRoute: ActivatedRoute, private backend: BackendService) {
    }

    ngOnInit(): void {
      const id = +this.activeRoute.snapshot.params.id;
      this.ticket$ = this.backend.ticket(id);
    }
}
