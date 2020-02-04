import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BackendService } from '../../../services';
import { MaterialModule } from '../../../material/material.module';

import { TicketDetailComponent } from './ticket-detail.component';

const routes: Routes = [
    { path: '', component: TicketDetailComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ TicketDetailComponent ],
    providers: [ BackendService ]
})
export class TicketDetailModule {
}
