import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeComponent ],
            imports: [ RouterTestingModule ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct page header', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.page-header').textContent).toContain('Welcome');
    }));

    it('should display tickets button', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('button.tickets').textContent).toContain('Tickets');
    }));
});
