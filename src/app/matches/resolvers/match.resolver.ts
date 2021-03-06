import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { GetMatchDetailQuery } from '@network/shared/matches';

import { MatchActions } from '@matches/store/matches.actions';
import { MatchEventActions } from '@match-events/store';
import { MatchPersonActions } from '@match-persons/store';


@Injectable()
export class MatchResolver implements Resolve<any> {

    constructor(private store: Store) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<GetMatchDetailQuery.Response> {
        const payload = new GetMatchDetailQuery.Request({ id: route.params.id });
        return this.store.dispatch([
            new MatchActions.GetMatchById(payload),
            new MatchEventActions.GetList(route.params.id),
            new MatchPersonActions.GetList(route.params.id)
       //     new CommentActions.GetCommentsListByEntity( new GetCommentListByEntityIdQuery.Request({matchId: route.params.id}))
       ]);
    }

}
