import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../../material/material.module';
import { TicketCreateComponent } from './ticket-create.component';

describe('TicketCreateComponent', () => {
    let component: TicketCreateComponent;
    let fixture: ComponentFixture<TicketCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TicketCreateComponent ],
            imports: [ MaterialModule, ReactiveFormsModule, RouterTestingModule ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct page header', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.page-header').textContent).toContain('Ticket Create');
    }));
});
