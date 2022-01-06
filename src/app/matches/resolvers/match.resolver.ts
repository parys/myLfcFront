import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { GetMatchDetailQuery } from '@network/shared/matches';

import { MatchActions } from '@matches/store/matches.actions';
import { MatchEventActions } from '@match-events/store';
import { MatchPersonActions } from '@match-persons/store';
import { CommentActions } from '@comments/shared/store';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';


@Injectable()
export class MatchResolver implements Resolve<any> {

    constructor(private store: Store) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<GetMatchDetailQuery.Response> {
        const payload = new GetMatchDetailQuery.Request({ id: route.params.id });
        const actions = [];
        actions.push(new MatchActions.GetMatchById(payload));
        if (route.params.id) {
            actions.push(new MatchEventActions.GetList(route.params.id));
            actions.push(new MatchPersonActions.GetList(route.params.id));
            actions.push(new CommentActions.GetCommentsListByEntity(new GetCommentListByEntityIdQuery.Request({matchId: route.params.id})));
             }
        return this.store.dispatch(actions);
    }

}
