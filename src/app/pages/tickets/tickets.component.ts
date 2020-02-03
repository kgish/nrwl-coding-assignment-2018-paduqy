import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { BackendService, Ticket, User } from "../../services";

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: [ './tickets.component.css' ]
})
export class TicketsComponent implements OnInit {

    tickets$: Observable<Ticket[]>;
    // users$: Observable<User[]>;

    constructor(private backend: BackendService) {
    }

    ngOnInit(): void {
      this.tickets$ = this.backend.tickets();
        // this.users$ = this.backend.users();
    }
}
