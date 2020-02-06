import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material';

import {
    FooterComponent,
    HeaderComponent,
    SpinnerComponent
} from './components';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SpinnerComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SpinnerComponent
    ]
})
export class SharedModule {
}
