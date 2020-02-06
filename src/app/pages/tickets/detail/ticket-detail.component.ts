import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import { MatSnackBar } from '@angular/material/snack-bar';

import { BackendService, Ticket, User } from '../../../services';

interface Data {
    ticket: Ticket;
    users: User[];
}

type Action = 'Updating' | 'Deleting';

@Component({
    selector: 'app-tickets',
    templateUrl: './ticket-detail.component.html',
    styleUrls: [ './ticket-detail.component.css' ]
})
export class TicketDetailComponent implements OnInit, OnDestroy {

    data$: Observable<Data>;
    form: FormGroup;

    original: string;
    updated = false;

    subscr: Subscription;

    action: Action;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router,
        // private snackbar: MatSnackBar,
        private backend: BackendService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [ '' ],
            description: [ '', [ Validators.required ] ],
            assigneeId: [ '' ],
            completed: [ '' ]
        });

        const id = +this.activeRoute.snapshot.params.id;
        const ticket$ = this.backend.ticket(id);
        const users$ = this.backend.users();

        this.data$ = combineLatest([ ticket$, users$ ]).pipe(
            map(result => ({ ticket: result[0], users: result[1] })),
            tap(data => this._initData(data))
        );
    }

    ngOnDestroy(): void {
        if (this.subscr) {
            this.subscr.unsubscribe();
            this.subscr = null;
        }
    }

    update() {
        const ticket: Ticket = this.form.value as Ticket;

        this.action = 'Updating';
        this.backend.update(ticket).subscribe(
            t => {
                // this.snackbar.open(`Updated ticket #${t.id} "${t.description}"`, 'Ok', { duration: 2000 });
                console.log(`Updated ticket: ${JSON.stringify(t)}`);
            },
            error => console.error(error),
            () => this._completed()
        );
    }

    delete() {
        const ticket: Ticket = this.form.value as Ticket;

        if (window.confirm('Are you sure?')) {
            this.action = 'Deleting';
            this.backend.delete(ticket.id).subscribe(
                t => {
                    // this.snackbar.open(`Deleted ticket #${t.id} "${t.description}"`, 'Ok', { duration: 2000 });
                    console.log(`Deleted ticket: ${JSON.stringify(t)}`);
                },
                error => console.error(error),
                () => this._completed()
            );
        }
    }

    cancel() {
        const t: Ticket = this.form.value as Ticket;

        // this.snackbar.open(`Cancelled ticket update #${t.id} "${t.description}"`, 'Ok', { duration: 2000 });
        console.log(`Cancelled ticket update: ${JSON.stringify(t)}`);
        this.router.navigate([ '/tickets' ]);
    }

    // Private

    private _initData(data: Data) {
        if (data.ticket) {
            this.form.patchValue(data.ticket);
            this.original = JSON.stringify(data.ticket);
            this._subscribeChanges();
        }
    }

    private _subscribeChanges() {
        this.subscr = this.form.valueChanges.subscribe(value => {
            const updated = JSON.stringify(value);
            this.updated = this.original !== updated;
        });
    }

    private _completed() {
        this.action = null;
        this.router.navigate([ '/tickets' ]);
    }
}
