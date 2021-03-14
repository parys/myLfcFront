import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { RightSidebarStateModel } from './right-sidebar.model';
import { RightSidebarActions } from './right-sidebar.actions';

import { patch, removeItem, updateItem } from '@ngxs/store/operators';

import { SidebarRightService } from '../sidebar-right.service';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { SignalRActions } from '@base/signalr/signalr.actions';
import { SignalREntityEnum } from '@base/signalr/models';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';


@State<RightSidebarStateModel>({
    name: 'rightSidebar',
    defaults: {
        latestComments: [],
        userBirthdays: [],
        usersOnline: null
    },
})
@Injectable()
export class RightSidebarState {

    @Selector()
    static latestComments(state: RightSidebarStateModel) {
        return state.latestComments;
    }

    @Selector()
    static userBirthdays(state: RightSidebarStateModel) {
        return state.userBirthdays;
    }

    @Selector()
    static usersOnline(state: RightSidebarStateModel) {
        return state.usersOnline;
    }

    constructor(protected sidebarService: SidebarRightService
    ) { }

    @Action(RightSidebarActions.GetLatestCommentList)
    onGetLatestCommentList({ patchState }: StateContext<RightSidebarStateModel>) {
        return this.sidebarService.getLastComments()
            .pipe(
                tap(latestComments => {
                    patchState({latestComments: latestComments.results});
                }));
    }

    @Action(SignalRActions.UpdateComment)
    onUpdateComment({ setState, patchState, getState }: StateContext<RightSidebarStateModel>,
         { payload }: SignalRActions.UpdateComment) {
        const { latestComments } = getState();
        switch (payload.type) {
            case (SignalREntityEnum.Add): {
                latestComments.pop();
                patchState({ latestComments: [payload.entity, ... latestComments] });
                break;
            }
            case (SignalREntityEnum.Update): {
                setState(
                    patch({
                        latestComments: updateItem<GetLatestCommentListQuery.LastCommentListDto | GetCommentListByEntityIdQuery.CommentListDto>
                            (item => item.id === payload.entity.id, payload.entity)
                    })
                );
                break;
            }
            case (SignalREntityEnum.Delete): {
                setState(
                    patch({
                        latestComments: removeItem<GetLatestCommentListQuery.LastCommentListDto | GetCommentListByEntityIdQuery.CommentListDto>
                            (item => item.id === payload.entity.id)
                    })
                );
                break;
            }
        }
    }

    @Action(RightSidebarActions.GetUserBirthdays)
    onGetUserBirthdays({ patchState }: StateContext<RightSidebarStateModel>) {
        return this.sidebarService.getUsersBirthdays()
            .pipe(
                tap(response => {
                    patchState({userBirthdays: response.results});
                }));
    }

    @Action(SignalRActions.SetOnlineUsers)
    onSetOnlineUsers({ patchState }: StateContext<RightSidebarStateModel>, { payload }: SignalRActions.SetOnlineUsers) {
        patchState({ usersOnline: payload });
    }


    @Action(RightSidebarActions.GetOnlineUsers)
    onCreateMessage({ patchState }: StateContext<RightSidebarStateModel>) {
        return this.sidebarService.getOnlineCount().pipe(
            tap(response => {
                patchState({ usersOnline: response });
            })
        )
    }
}
