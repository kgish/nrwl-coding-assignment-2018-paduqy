import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BackendService, Ticket } from '../../services';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: [ './tickets.component.css' ]
})
export class TicketsComponent implements OnInit {

    tickets$: Observable<Ticket[]>;

    constructor(
        private router: Router,
        private backend: BackendService
    ) {
    }

    ngOnInit(): void {
        this.tickets$ = this.backend.tickets();
    }
}
