import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { ConfirmationMessage } from '@notices/shared';


@Component({
    selector: 'confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationMessage,
    ) {
        this.dialogRef.addPanelClass('confirmation-panel-dialog');
    }

}
