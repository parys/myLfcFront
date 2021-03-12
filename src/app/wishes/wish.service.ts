import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { WISHES_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { WishFilter } from './models/wish-filter.model';
import { Wish } from './models/wish.model';
import { WishType } from './models/wish-type.model';
import { WishState } from './models/wish-state.model';

@Injectable()
export class WishService extends BaseRestService<Wish, WishFilter> {
    private actionUrl: string = WISHES_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, WISHES_ROUTE + '/');
    }

    public getTypes(): Observable<WishType[]> {
        return this.http.get<WishType[]>(this.actionUrl + 'types/');
    }

    public getStates(): Observable<WishState[]> {
        return this.http.get<WishState[]> (this.actionUrl + 'states/');
    }
}
