import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
} from '@angular/material';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
    ],
    exports: [
      MatButtonModule,
      MatToolbarModule,
    ]
})
export class MaterialModule {
}