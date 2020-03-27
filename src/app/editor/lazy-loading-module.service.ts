import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';

@Injectable()
export class LazyLoadingModuleService {
    private loaded: ReplaySubject<boolean>;
    private loadedFull: ReplaySubject<boolean>;
    constructor() { }

    public async load(): Promise<any> {
        if (this.loaded) {
            return;
        }

        await import('src/app/editor/tiny-module/tiny.module');

        this.loaded = new ReplaySubject();
        this.loaded.next(true);
        this.loaded.complete();
    }

    public async loadFull(): Promise<any> {
        if (this.loadedFull) {
            return;
        }

        await import('src/app/editor/tiny-module/tiny-full.module');

        this.loadedFull = new ReplaySubject();
        this.loadedFull.next(true);
        this.loadedFull.complete();
    }

    public getTinymce = () => {
        const w = typeof window !== 'undefined' ? (window as any) : undefined;
        return w && w.tinymce ? w.tinymce : null;
    }
}
