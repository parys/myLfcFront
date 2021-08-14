import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { insertItem, patch, updateItem } from '@ngxs/store/operators';
import cloneDeep from 'lodash/cloneDeep';

import { CommentActions } from './comments.actions';

import { CommentService } from '@comments/comment.service';
import { CommentsStateModel } from './comments.model';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';
import { MaterialsState } from '@materials/lazy/store';
import { MatchesState } from '@matches/store';
import { SignalRActions } from '@base/signalr/signalr.actions';
import { SignalREntityEnum } from '@base/signalr/models';


@State<CommentsStateModel>({
    name: 'comments',
    defaults: {
        comments: [],
        commentsNumber: 0
    },
})
@Injectable()
export class CommentsState {

    @Selector()
    static comments(state: CommentsStateModel) {
        return state.comments;
    }

    @Selector()
    static commentsNumber(state: CommentsStateModel) {
        return state.commentsNumber;
    }

    constructor(private commentsService: CommentService, private store: Store) { }


    @Action(CommentActions.GetCommentsListByEntity)
    onGetCommentsListByEntity({ patchState }: StateContext<CommentsStateModel>, { payload }: CommentActions.GetCommentsListByEntity) {
        return this.commentsService.getAllByEntityId(payload)
            .pipe(
                tap(response => {
                    patchState({ comments: response.results || [], commentsNumber: response.rowCount });
                })
            );
    }
// TODO Research how to deal with that (have comments list + signalR update + keep comments when editing)
    // @Action(SignalRActions.UpdateComment)
    // onUpdate({ patchState, getState, setState }: StateContext<CommentsStateModel>, { payload }: SignalRActions.UpdateComment) {

    //     const materialId = this.store.selectSnapshot(MaterialsState.material)?.id;
    //     const matchId = this.store.selectSnapshot(MatchesState.match)?.id;

    //     if (matchId !== payload.entity.matchId && materialId !== payload.entity.materialId) {
    //              return;
    //     }
    //     if (payload.type != SignalREntityEnum.Update) {
    //         let { commentsNumber } = getState();
    //         let diff = payload.type === SignalREntityEnum.Add ? 1 : -1;
    //         patchState({ commentsNumber: (commentsNumber + diff) });
    //     }
    //     const { comments } = getState();
    //     if (payload.entity.parentId == null) {
    //         const index = comments.findIndex(x => x.id === payload.entity.id);
    //         if (index !== -1) {
    //             payload.entity.children = comments[index].children;
    //             comments[index] = payload.entity;
    //             setState(patch({ comments: updateItem(x => x.id === payload.entity.id, payload.entity)}));
    //         } else {
    //             setState(patch({ comments: insertItem(payload.entity, comments.length)}));
    //         }
    //     } else {
    //         this.updateComment(comments, payload.entity);
    //         patchState({ comments: cloneDeep(comments) });
    //     }
    // }

    // private updateComment(comments: GetCommentListByEntityIdQuery.CommentListDto[],
    //         payload: GetCommentListByEntityIdQuery.CommentListDto): GetCommentListByEntityIdQuery.CommentListDto {
    //     let commentFound: GetCommentListByEntityIdQuery.CommentListDto;
    //     for (let index = 0; index < comments.length; index++) {
    //         if (comments[index].id === payload.parentId) {
    //             this.putToChildren(comments[index], payload);
    //             commentFound = payload;
    //             return payload;
    //         } else {
    //             if (!commentFound) {
    //                 commentFound = this.updateComment(comments[index].children, payload);
    //             }
    //         }
    //     };
    // }

    // private putToChildren(comment: GetCommentListByEntityIdQuery.CommentListDto,
    //     payload: GetCommentListByEntityIdQuery.CommentListDto): void {
    //     const commentIndex = comment.children.findIndex(x => x.id === payload.id);
    //     if (commentIndex !== -1) {
    //         payload.children = comment.children[commentIndex].children;
    //         comment.children[commentIndex] = payload;
    //     } else {
    //         comment.children.push(payload);
    //     }
    // }
}
