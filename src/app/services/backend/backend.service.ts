import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export interface User {
    id: number;
    name: string;
}

export interface Ticket {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
}

function randomDelay() {
    return Math.random() * 2000;
    // return Math.random() * 4000;
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    storedTickets: Ticket[] = [
        {
            id: 1001,
            description: 'Install a monitor arm',
            assigneeId: 111,
            completed: false
        },
        {
            id: 1002,
            description: 'Move desk to new location',
            assigneeId: 115,
            completed: false
        },
        {
            id: 1003,
            description: 'Buy some flowers',
            assigneeId: 113,
            completed: true
        },
        {
            id: 1004,
            description: 'Send email invitation',
            assigneeId: 112,
            completed: false
        }
    ];

    storedUsers: User[] = [
        { id: 111, name: 'Victor' },
        { id: 112, name: 'Richard' },
        { id: 113, name: 'Sharon' },
        { id: 114, name: 'Kiffin' },
        { id: 115, name: 'Kelly' }
    ];

    lastId = 1004;

    constructor() {
    }

    private findTicketById = id => this.storedTickets.find(ticket => ticket.id === +id);
    private findUserById = id => this.storedUsers.find(user => user.id === +id);

    tickets() {
        return throwError(new Error('500 Internal Serfver Error'));
        // return of(this.storedTickets).pipe(delay(randomDelay()));
    }

    ticket(id: number): Observable<Ticket> {
        return of(this.findTicketById(id)).pipe(delay(randomDelay()));
    }

    users() {
        return of(this.storedUsers).pipe(delay(randomDelay()));
    }

    user(id: number) {
        return of(this.findUserById(id)).pipe(delay(randomDelay()));
    }

    newTicket(ticket: Ticket) {
        const newTicket: Ticket = {
            id: ++this.lastId,
            description: ticket.description,
            assigneeId: ticket.assigneeId,
            completed: ticket.completed
        };

        return of(newTicket).pipe(
            delay(randomDelay()),
            tap((t: Ticket) => this.storedTickets.push(t))
        );
    }

    description(ticketId: number, description: string) {
        const foundTicket = this.findTicketById(+ticketId);
        if (foundTicket) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => ticket.description = description)
            );
        }

        return throwError(new Error('ticket or user not found'));
    }

    assign(ticketId: number, userId: number) {
        const foundTicket = this.findTicketById(+ticketId);
        const user = this.findUserById(+userId);

        if (foundTicket && user) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => ticket.assigneeId = +userId)
            );
        }

        return throwError(new Error('ticket or user not found'));
    }

    complete(ticketId: number, completed: boolean) {
        const foundTicket = this.findTicketById(+ticketId);
        if (foundTicket) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => ticket.completed = true)
            );
        }

        return throwError(new Error('ticket not found'));
    }

    update(updated: Ticket) {
        const foundTicket = this.findTicketById(+updated.id);
        const user = this.findUserById(+updated.assigneeId);

        if (foundTicket && user) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => ticket = updated)
            );
        }

        return throwError(new Error('ticket or user not found'));
    }

    delete(ticketId: number) {
        const foundTicket = this.findTicketById(+ticketId);
        if (foundTicket) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => {
                    const index = this.storedTickets.findIndex(t => ticket.id === t.id);
                    this.storedTickets.splice(index, 1);
                })
            );
        }

        return throwError(new Error('ticket not found'));
    }
}
