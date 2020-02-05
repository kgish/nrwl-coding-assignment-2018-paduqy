import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { TicketsComponent } from './tickets.component';

describe('TicketsComponent', () => {
    let component: TicketsComponent;
    let fixture: ComponentFixture<TicketsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TicketsComponent ],
            imports: [ MaterialModule, RouterTestingModule ]
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
});
