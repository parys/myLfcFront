import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Comment, CommentVote, CommentFilter } from '@domain/models';
import { HttpWrapper } from '@base/httpWrapper';
import { COMMENTS_ROUTE, MATERIALS_ROUTE, MATCHES_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';

@Injectable()
export class CommentService extends BaseRestService<Comment | GetCommentListByEntityIdQuery.CommentListDto, CommentFilter> {
    private actionUrl: string = COMMENTS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, COMMENTS_ROUTE + '/');
    }

    public getAllByEntityId(filter: GetCommentListByEntityIdQuery.Request): Observable<GetCommentListByEntityIdQuery.Response> {
        const uri = filter.materialId ? `${MATERIALS_ROUTE}/${filter.materialId}/comments` : `${MATCHES_ROUTE}/${filter.matchId}/comments`;
        return this.http.getWithParams<GetCommentListByEntityIdQuery.Response>(uri, filter);
    }

    public verify(id: number): Observable<number> {
        return this.http.put<number>(this.actionUrl + id + '/verify', '');
    }

    public vote(vote: CommentVote): Observable<boolean> {
        return this.http.put<boolean>(this.actionUrl + 'vote/', JSON.stringify(vote));
    }
}
