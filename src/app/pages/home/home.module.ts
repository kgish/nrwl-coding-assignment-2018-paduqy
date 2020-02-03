import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '../../shared/shared.module';
import { BackendService } from '../../services';

const routes: Routes = [
    { path: '', component: HomePage }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ HomePage ],
    providers: [ BackendService ]
})
export class HomePageModule {
}
