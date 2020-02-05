import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../../material/material.module';
import { TicketDetailComponent } from './ticket-detail.component';

describe('TicketDetailComponent', () => {
    let component: TicketDetailComponent;
    let fixture: ComponentFixture<TicketDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TicketDetailComponent ],
            imports: [ MaterialModule, ReactiveFormsModule, RouterTestingModule ]
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
});
