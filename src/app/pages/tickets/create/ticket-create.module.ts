import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material';
import { SharedModule } from '../../../shared';

import { TicketCreateComponent } from './ticket-create.component';

const routes: Routes = [
    {
        path: '',
        component: TicketCreateComponent
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
    declarations: [ TicketCreateComponent ],
})
export class TicketCreateModule {
}
