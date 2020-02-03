import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { BackendService, Ticket, User } from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {

    tickets$: Observable<Ticket[]>;
    users$: Observable<User[]>;

    constructor(private backend: BackendService) {}

    ngOnInit(): void {
        this.tickets$ = this.backend.tickets();
        this.users$ = this.backend.users();
    }
}
