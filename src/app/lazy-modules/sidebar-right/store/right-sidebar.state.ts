import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { RightSidebarStateModel } from './right-sidebar.model';
import { RightSidebarActions } from './right-sidebar.actions';

import { patch, updateItem } from '@ngxs/store/operators';

import { SidebarRightService } from '../sidebar-right.service';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';


@State<RightSidebarStateModel>({
    name: 'rightSidebar',
    defaults: {
        latestComments: [],
        userBirthdays: []
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

    @Action(RightSidebarActions.PutToLatestComments)
    onPutToLatestComments({ setState, patchState, getState }: StateContext<RightSidebarStateModel>,
         { payload }: RightSidebarActions.PutToLatestComments) {
        const { latestComments } = getState();
        const index = latestComments.findIndex(x => x.id === payload.id);
        if (index > -1) {
            setState(
                patch({
                    latestComments: updateItem<GetLatestCommentListQuery.LastCommentListDto>
                        (item => item.id === payload.id, payload)
                })
            );
        } else {
            latestComments.pop();
            patchState({ latestComments: [payload, ... latestComments] });
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


    // @Action(RightSidebarActions.CreateChatMessage)
    // onCreateMessage(ctx: StateContext<RightSidebarStateModel>, { payload }: RightSidebarActions.CreateChatMessage) {
    //     return this.chatService.create(payload).pipe(
    //         tap(response => {
    //         })
    //     )
    // }

    // @Action(RightSidebarActions.UpdateChatMessage)
    // onUpdateMessage({ dispatch }: StateContext<RightSidebarStateModel>, { payload }: RightSidebarActions.UpdateChatMessage) {
    //     return this.chatService.update(payload.id, payload).pipe(
    //         tap(response => {
    //             dispatch(new ShowNotice(NoticeMessage.success('Cообщение обновлено', '')))
    //         })
    //     )
    // }

    // @Action(RightSidebarActions.DeleteChatMessage)
    // onDeleteMessage({ setState, dispatch }: StateContext<RightSidebarStateModel>, { payload }: RightSidebarActions.DeleteChatMessage) {
    //     return this.chatService.delete(payload).pipe(
    //         tap(result => {
    //             if (result) {
    //                 setState(
    //                     patch({
    //                         miniMessages: removeMany<GetChatMessagesListQuery.ChatMessageListDto>
    //                             (item => item.id === payload)
    //                     })
    //                 );
    //                 setState(
    //                     patch({
    //                         maxiMessages: removeMany<GetChatMessagesListQuery.ChatMessageListDto>
    //                             (item => item.id === payload)
    //                     })
    //                 );
    //             }

    //             dispatch(new ShowNotice(NoticeMessage.success('Сообщение удалено', '')));
    //         })
    //     );
    // }
}
