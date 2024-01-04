import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { GetMatchDetailQuery } from '@network/shared/matches';

import { MatchActions } from '@matches/store/matches.actions';


@Injectable()
export class MatchEditResolver  {

    constructor(private store: Store) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<GetMatchDetailQuery.Response> {
        const payload = new GetMatchDetailQuery.Request({ id: +route.params.id });
        return this.store.dispatch([
            new MatchActions.GetMatchById(payload),
            new MatchActions.GetMatchTypesList()
        ]);
    }

}
