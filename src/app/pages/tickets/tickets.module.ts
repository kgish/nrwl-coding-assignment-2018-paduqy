import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../material';
import { SharedModule } from '../../shared';

import { TicketsComponent } from './tickets.component';

const routes: Routes = [
    {
        path: '',
        component: TicketsComponent
    },
    {
        path: ':id/details',
        loadChildren: () => import('./detail/ticket-detail.module').then(m => m.TicketDetailModule)
    },
    {
        path: 'create',
        loadChildren: () => import('./create/ticket-create.module').then(m => m.TicketCreateModule)
    }
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ TicketsComponent ]
})
export class TicketsModule {
}
