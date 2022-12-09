import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { Observable } from 'rxjs';

import { ConfirmationComponent } from '@notices/components';
import { ConfirmationMessage } from '@notices/shared';


@Injectable()
export class NotifierService {

    constructor(private dialog: MatDialog) { }

    public confirm(data: ConfirmationMessage): Observable<boolean> {
        return this.dialog.open(ConfirmationComponent, { data }).afterClosed();
    }

    public confirmDeletion(): Observable<boolean> {
        return this.dialog.open(ConfirmationComponent, { data: { title : 'Удалить?'} }).afterClosed();
    }
}
