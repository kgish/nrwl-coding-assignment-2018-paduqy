import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';

import { BackendService, Ticket, User } from '../../../services';

interface Data {
    ticket: Ticket;
    users: User[];
}

@Component({
    selector: 'app-tickets',
    templateUrl: './ticket-create.component.html',
    styleUrls: [ './ticket-create.component.css' ]
})
export class TicketCreateComponent implements OnInit {

    form: FormGroup;

    users$: Observable<User[]>;

    creating = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        // private snackbar: MatSnackBar,
        private backend: BackendService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            description: [ '', [ Validators.required ] ],
            assigneeId: [ null ],
            completed: [ false ]
        });

        this.users$ = this.backend.users();
    }

    create() {
        const ticket: Ticket = this.form.value as Ticket;
        this.creating = true;
        this.backend.newTicket(ticket).subscribe(
            t => {
                // this.snackbar.open(`Created ticket #${t.id} "${t.description}"`, 'OK', { duration: 2000 });
                console.log(`Created ticket: ${JSON.stringify(t)}`);
            },
            error => console.error(error),
            () => this._completed()
        );
    }

    // Private

    private _completed() {
        this.creating = false;
        this.router.navigate([ '/tickets' ]);
    }
}
