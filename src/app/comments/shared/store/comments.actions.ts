import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';

export namespace CommentActions {

    export class GetCommentsListByEntity {
        static readonly type = '[Comments] Get comments list by entity id';
        constructor(public payload: GetCommentListByEntityIdQuery.Request) { }
    }

}