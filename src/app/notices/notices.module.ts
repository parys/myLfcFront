import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBarModule as MatSnackBarModule, MAT_LEGACY_SNACK_BAR_DEFAULT_OPTIONS as MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/legacy-snack-bar';

import { ConfirmationComponent, NoticeComponent, NotifierComponent } from '@notices/components';
import { NotifierService } from '@notices/services';
import { EnsureModuleLoadedOnceGuard } from '@domain/base/ensure-module-loaded-once.guard';


@NgModule({
    declarations: [
        NotifierComponent,
        ConfirmationComponent,
        NoticeComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule,
    ],
    exports: [
        NotifierComponent
    ]
})
export class NoticesModule extends EnsureModuleLoadedOnceGuard {

    static forRoot(): ModuleWithProviders<NoticesModule> {
        return {
            ngModule: NoticesModule,
            providers: [
                NotifierService,
                {
                    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
                    useValue: { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center', panelClass: [ 'system-notification-container' ]  }
                }
            ]
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: NoticesModule,
    ) {
        super(parentModule);
    }
}
