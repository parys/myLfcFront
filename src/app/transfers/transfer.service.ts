import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { TRANSFERS_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { Transfer } from './models/transfer.model';
import { TransferFilters } from './models/transfer-filters.model';

@Injectable()
export class TransferService extends BaseRestService<Transfer, TransferFilters> {
    private actionUrl: string = TRANSFERS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, TRANSFERS_ROUTE + '/');
    }

    public getCurrentAll(): Observable<Transfer[]> {
        return this.http.get<Transfer[]>(this.actionUrl + 'current');
    }
}
