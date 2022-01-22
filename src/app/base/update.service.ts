import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable()
export class UpdateService {
    constructor(private swUpdate: SwUpdate,
                private snackbar: MatSnackBar,
                @Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformServer(this.platformId)) { return; }

        this.swUpdate.versionUpdates.pipe(
            filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')).
            subscribe(evt => {
                const snack = this.snackbar.open('Доступно обновление', 'Обновить');
                snack
                    .onAction()
                    .subscribe(() => {
                        window.location.reload();
                    });

                setTimeout(() => {
                    snack.dismiss();
                }, 5000);
            });
    }
}
