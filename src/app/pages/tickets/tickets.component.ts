import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { BackendService, Ticket } from "../../services";

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: [ './tickets.component.css' ]
})
export class TicketsComponent implements OnInit {

    tickets$: Observable<Ticket[]>;

    constructor(
        private backend: BackendService
    ) {
    }

    ngOnInit(): void {
        this.tickets$ = this.backend.tickets();
    }

    create() {
        // TODO
        console.log('create')
    }
}
