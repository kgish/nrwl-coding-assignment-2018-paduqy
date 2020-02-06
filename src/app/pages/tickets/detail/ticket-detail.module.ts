import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material';
import { SharedModule } from '../../../shared';

import { TicketDetailComponent } from './ticket-detail.component';

const routes: Routes = [
    {
        path: '',
        component: TicketDetailComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ TicketDetailComponent ],
})
export class TicketDetailModule {
}
