import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BackendService, Ticket, User } from '../../../services';

interface Data {
    ticket: Ticket;
    users: User[];
}

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

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router,
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
        const updated: Ticket = this.form.value;
        const original: Ticket = JSON.parse(this.original);
        const observables: Observable<Ticket>[] = [];

        if (updated.description !== original.description) {
            observables.push(this.backend.description(updated.id, updated.description));
        }

        if (updated.completed !== original.completed) {
            observables.push(this.backend.complete(updated.id, updated.completed));
        }

        if (updated.assigneeId !== original.assigneeId) {
            observables.push(this.backend.assign(updated.id, updated.assigneeId));
        }

        combineLatest(observables).subscribe(() => {
            console.log(`Updated ticket #${updated.id}`);
            this.router.navigate([ '/tickets' ]);
        });

        // TODO
        // this.backend.update(updated).subscribe(ticket => {
        //     console.log(`Deleted ticket #${updated.id}`);
        //     this.router.navigate([ '/tickets' ])
        // });
    }

    delete() {
        const id = this.form.get('id').value;
        if (window.confirm('Are you sure?')) {
            this.backend.delete(id).subscribe(ticket => {
                console.log(`Deleted ticket #${id}`);
                this.router.navigate([ '/tickets' ]);
            });
        }
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
}
