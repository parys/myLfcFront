import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import {
    CommentActions
} from './comments.actions';

import { CommentService } from '@comments/comment.service';
import { CommentsStateModel } from './comments.model';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';
import { MaterialsState } from '@materials/lazy/store';
import { MatchesState } from '@matches/store';


@State<CommentsStateModel>({
    name: 'comments',
    defaults: {
        comments: []
    },
})
@Injectable()
export class CommentsState {

    @Selector()
    static comments(state: CommentsStateModel) {
        return state.comments;
    }

    constructor(private commentsService: CommentService, private store: Store) { }


    @Action(CommentActions.GetCommentsListByEntity)
    onGetCommentsListByEntity({ patchState }: StateContext<CommentsStateModel>, { payload }: CommentActions.GetCommentsListByEntity) {
        return this.commentsService.getAllByEntityId(payload)
            .pipe(
                tap(response => {
                    patchState({ comments: response.results || [] });
                })
            );
    }

    @Action(CommentActions.PutNewComment)
    onPutNewComment({ patchState, getState }: StateContext<CommentsStateModel>, { payload }: CommentActions.PutNewComment) {
        const { comments } = getState();
        const materialId = this.store.selectSnapshot(MaterialsState.material)?.id;
        const matchId = this.store.selectSnapshot(MatchesState.match)?.id;

        if (matchId !== payload.matchId && materialId !== payload.materialId) {
                 return;
        }
        if (payload.parentId == null) {
            const index = comments.findIndex(x => x.id === payload.id);
            if (index !== -1) {
                payload.children = comments[index].children;
                comments[index] = payload;
            } else {
                comments.push(payload);
            }
        } else {
            this.updateComment(comments, payload);
        }
        patchState({ comments: [...comments] });
    }

    private updateComment(comments: GetCommentListByEntityIdQuery.CommentListDto[],
        payload: GetCommentListByEntityIdQuery.CommentListDto): GetCommentListByEntityIdQuery.CommentListDto {
        let commentFound: GetCommentListByEntityIdQuery.CommentListDto;
        for (let index = 0; index < comments.length; index++) {
            if (comments[index].id === payload.parentId) {
                this.putToChildren(comments[index], payload);
                commentFound = payload;
                return payload;
            } else {
                if (!commentFound) {
                    commentFound = this.updateComment(comments[index].children, payload);
                }
            }
        };
    }

    private putToChildren(comment: GetCommentListByEntityIdQuery.CommentListDto,
        payload: GetCommentListByEntityIdQuery.CommentListDto): void {
        const commentIndex = comment.children.findIndex(x => x.id === payload.id);
        if (commentIndex !== -1) {
            payload.children = comment.children[commentIndex].children;
            comment.children[commentIndex] = payload;
        } else {
            comment.children.push(payload);
        }
    }
}