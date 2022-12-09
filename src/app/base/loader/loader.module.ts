import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

import { EnsureModuleLoadedOnceGuard } from '@domain/base/ensure-module-loaded-once.guard';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';


const mat = [
    MatProgressBarModule,
];

@NgModule({
    imports: [
        CommonModule,
            ...mat
    ],
    declarations: [
        LoaderComponent,
    ],
    exports: [
        LoaderComponent,
    ]
})
export class LoaderModule extends EnsureModuleLoadedOnceGuard {

    static forRoot(): ModuleWithProviders<LoaderModule> {
        return {
            ngModule: LoaderModule,
            providers: [
                LoaderService
            ],
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: LoaderModule,
    ) {
        super(parentModule);
    }
}
