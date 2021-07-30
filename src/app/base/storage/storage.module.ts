import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalStorage, SessionStorage } from './local-storage';
import { EnsureModuleLoadedOnceGuard } from '@domain/base/ensure-module-loaded-once.guard';

export function getStorage() {
    const result = typeof window !== 'undefined' ? window.localStorage : null;
    return result;
}

export function getSStorage() {
    const result = typeof window !== 'undefined' ? window.sessionStorage : null;
    return result;
}

@NgModule({})
export class StorageModule extends EnsureModuleLoadedOnceGuard {

    static forRoot(): ModuleWithProviders<StorageModule> {
        return {
            ngModule: StorageModule,
            providers: [
                StorageService,
                { provide: LocalStorage, useFactory: getStorage },
                { provide: SessionStorage, useFactory: getSStorage },
            ],
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: StorageModule,
    ) {
        super(parentModule);
    }
}
