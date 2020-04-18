import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OdComponent } from './od';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        OdComponent,
    ],
    exports: [
        OdComponent,
    ]
})
export class OdModule { }
