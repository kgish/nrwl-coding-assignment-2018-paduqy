import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MaterialModule } from '../../material/material.module';
import { TicketsComponent } from './tickets.component';
import { BackendService, Ticket } from '../../services/backend';

const TICKETS: Ticket[] = [
    { id: 1, description: 'Description #1', assigneeId: 1, completed: false },
    { id: 2, description: 'Description #2', assigneeId: 2, completed: false },
    { id: 3, description: 'Description #3', assigneeId: 3, completed: true },
];

@Injectable({
    providedIn: 'root'
})
export class MockBackendService {
    constructor() {
    }

    tickets() {
        return of(TICKETS);
    }
}

describe('TicketsComponent', () => {
    let component: TicketsComponent;
    let fixture: ComponentFixture<TicketsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TicketsComponent ],
            imports: [ MaterialModule, RouterTestingModule ],
            providers: [
                { provide: BackendService, useClass: MockBackendService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct page header', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.page-header').textContent).toContain('Tickets');
    }));

    it('should display correct number of tickets', async(() => {
        expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
    }));

    it('should display correct ticket descriptions', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        [ 1, 2, 3 ].forEach(n => expect(compiled.querySelector(`li:nth-child(${n}) a`).textContent).toEqual(`Description #${n}`));
    }));
});
