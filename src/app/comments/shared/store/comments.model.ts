import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';

export interface CommentsStateModel {
    comments: GetCommentListByEntityIdQuery.CommentListDto[];
    commentsNumber: number;

}
