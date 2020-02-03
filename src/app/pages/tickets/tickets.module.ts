import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BackendService } from "../../services";
import { MaterialModule } from "../../material/material.module";

import { TicketsComponent } from './tickets.component';

const routes: Routes = [
  { path: '', component: TicketsComponent }
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
