import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BackendService } from "../../services";
import { MaterialModule } from "../../material/material.module";

import { TicketsComponent } from './tickets.component';
import { TicketDetailComponent } from "./detail/ticket-detail.component";

const routes: Routes = [
  { path: '', component: TicketsComponent },
  {
    path: ':id/details',
    loadChildren: () => import('./detail/ticket-detail.module').then(m => m.TicketDetailModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
      MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ TicketsComponent ],
  providers: [BackendService]
})
export class TicketsModule {
}
