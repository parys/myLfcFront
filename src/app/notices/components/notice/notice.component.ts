import { Component, Inject, HostListener, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA, MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';

import { NoticeType, NoticeMessage } from '@notices/shared';


@Component({
    selector: 'notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent {

    public noticeType = NoticeType;

    @HostBinding('class') get hostClasses() {
        return `notice-${this.data.type}`;
    }

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: NoticeMessage, public snackBarRef: MatSnackBarRef<NoticeComponent>) {
    }

    @HostListener('click')
    public onClick() {
        this.snackBarRef.dismiss();
    }

}
