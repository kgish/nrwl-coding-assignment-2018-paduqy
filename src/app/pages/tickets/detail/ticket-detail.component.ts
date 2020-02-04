import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BackendService, Ticket, User } from '../../../services';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-tickets',
    templateUrl: './ticket-detail.component.html',
    styleUrls: [ './ticket-detail.component.css' ]
})
export class TicketDetailComponent implements OnInit, OnDestroy {

    ticket$: Observable<Ticket>;
    // users: User[] = [];
    users$: Observable<User[]>;

    form: FormGroup;
    updated = false;

    private subscr: Subscription;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private backend: BackendService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            description: [ '', [ Validators.required ] ],
            assignee: [ '' ],
            completed: [ false ]
        });

        this.subscr = this.form.valueChanges.subscribe(() => {
            this.updated = true;
            this._unsubscribe();
        });

        const id = +this.activeRoute.snapshot.params.id;
        this.ticket$ = this.backend.ticket(id);

        this.users$ = this.backend.users();
        // this.backend.users().subscribe(users => this.users = users);
    }

    ngOnDestroy(): void {
        this._unsubscribe();
    }

    update() {
        // TODO
        console.log(this.form.value);
    }

    delete() {
        // TODO
        console.log('delete!');
        this.router.navigate([ '/tickets' ])
    }

    // Private

    _unsubscribe() {
        if (this.subscr) {
            this.subscr.unsubscribe();
            this.subscr = null;
        }
    }
}
