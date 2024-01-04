import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { GetUserDetailQuery } from '@network/shared/users';

import { GetUserById } from '@users/store/users.actions';


@Injectable()
export class UserResolver  {

    constructor(private store: Store) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<GetUserDetailQuery.Response> {
        const payload = new GetUserDetailQuery.Request({ id: route.params.id });
        return this.store.dispatch([
            new GetUserById(payload)]);
    }

}
