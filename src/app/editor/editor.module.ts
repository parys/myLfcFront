import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor.component';

import { LazyLoadingModuleService } from './lazy-loading-module.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EditorComponent
    ],
    exports: [
        EditorComponent
    ],
    providers: [
        LazyLoadingModuleService
    ]
})
export class EditorModule { }
