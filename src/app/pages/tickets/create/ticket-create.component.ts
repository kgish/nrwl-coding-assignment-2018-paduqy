import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackbar: MatSnackBar,
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
        this.backend.newTicket(ticket).subscribe(t => {
            this.snackbar.open(`Created ticket #${t.id} "${t.description}"`, 'X', { duration: 2000 });
            console.log(`Created ticket: ${JSON.stringify(t)}`);
            this.router.navigate([ '/tickets' ]);
        });
    }
}
