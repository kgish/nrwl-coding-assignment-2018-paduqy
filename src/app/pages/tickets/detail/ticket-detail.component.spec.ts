import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { TicketDetailComponent } from './ticket-detail.component';
import { BackendService, Ticket, User } from '../../../services/backend';

import { MaterialModule } from '../../../material/material.module';

const TICKET_ID = 3;

const TICKETS: Ticket[] = [
    { id: 1, description: 'Description #1', assigneeId: 1, completed: false },
    { id: 2, description: 'Description #2', assigneeId: 2, completed: false },
    { id: 3, description: 'Description #3', assigneeId: 3, completed: true },
];

const USERS: User[] = [
    { id: 1, name: 'User #1' },
    { id: 2, name: 'User #2' },
    { id: 3, name: 'User #3' }
];

@Injectable()
class MockBackendService {
    ticket(id: number) {
        return of(TICKETS.find(t => t.id === id));
    }

    users() {
        return of(USERS);
    }
}

@Injectable()
class MockActivatedRoute {
    public snapshot = { params: { id: TICKET_ID.toString(10) } };
}

describe('TicketDetailComponent', () => {
    let component: TicketDetailComponent;
    let fixture: ComponentFixture<TicketDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TicketDetailComponent ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                { provide: BackendService, useClass: MockBackendService },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct page header', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.page-header').textContent).toContain('Ticket Detail');
    }));

    it('should display correct ticket', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const ticket = TICKETS.find(t => t.id === TICKET_ID);
        expect(compiled.querySelector('input.description').value).toEqual(ticket.description);
    }));
});
