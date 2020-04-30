import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';


import { NoticeMessage } from '@notices/shared';
import { ShowNotice } from '@notices/store';

import { ChatStateModel } from './chat.model';
import { ChatActions } from './chat.actions';

import { ChatMessageService } from '@chat/chat-message.service';
import { ChatMessageType } from '@domain/enums/chat-message-type.enum';
import { removeMany } from '@domain/operators/remove-from-many';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { patch, updateItem } from '@ngxs/store/operators';
import { appendToStartOrUpdate } from '@domain/operators/append-to-start-or-append';


@State<ChatStateModel>({
    name: 'chat',
    defaults: {
        miniMessages: [],
        maxiMessages: [],
    },
})
@Injectable()
export class ChatState {

    @Selector()
    static miniMessages(state: ChatStateModel) {
        return state.miniMessages;
    }

    @Selector()
    static maxiMessages(state: ChatStateModel) {
        return state.maxiMessages;
    }

    constructor(protected chatService: ChatMessageService
    ) { }

    @Action(ChatActions.GetChatList)
    onGetUsersList({ patchState }: StateContext<ChatStateModel>, { payload }: ChatActions.GetChatList) {
        return this.chatService.getAll(payload)
            .pipe(
                tap(response => {
                    if (payload.typeId === ChatMessageType.Mini) {
                        patchState({ miniMessages: response.results })
                    } else if (payload.typeId === ChatMessageType.Big) {
                        patchState({ maxiMessages: response.results })
                    }
                }));
    }

    @Action(ChatActions.CreateChatMessage)
    onCreateMessage(ctx: StateContext<ChatStateModel>, { payload }: ChatActions.CreateChatMessage) {
        return this.chatService.create(payload).pipe(
            tap(response => {
            })
        )
    }

    @Action(ChatActions.UpdateChatMessage)
    onUpdateMessage({ dispatch }: StateContext<ChatStateModel>, { payload }: ChatActions.UpdateChatMessage) {
        return this.chatService.update(payload.id, payload).pipe(
            tap(response => {
                dispatch(new ShowNotice(NoticeMessage.success('Cообщение обновлено', '')))
            })
        )
    }

    @Action(ChatActions.DeleteChatMessage)
    onDeleteMessage({ setState, dispatch }: StateContext<ChatStateModel>, { payload }: ChatActions.DeleteChatMessage) {
        return this.chatService.delete(payload).pipe(
            tap(result => {
                if (result) {
                    setState(
                        patch({
                            miniMessages: removeMany<GetChatMessagesListQuery.ChatMessageListDto>
                                (item => item.id === payload)
                        })
                    );
                    setState(
                        patch({
                            maxiMessages: removeMany<GetChatMessagesListQuery.ChatMessageListDto>
                                (item => item.id === payload)
                        })
                    );
                }

                dispatch(new ShowNotice(NoticeMessage.success('Сообщение удалено', '')));
            })
        );
    }

    @Action(ChatActions.PutToChatMessage)
    onPutToChatMessage({ setState }: StateContext<ChatStateModel>, { payload }: ChatActions.PutToChatMessage) {
        if (payload.type === ChatMessageType.Mini) {
            setState(
                patch({
                    miniMessages: appendToStartOrUpdate<GetChatMessagesListQuery.ChatMessageListDto>
                        (payload, item => item.id === payload.id)
                })
            );
        } else if (payload.type === ChatMessageType.Big) {
            setState(
                patch({
                    maxiMessages: appendToStartOrUpdate<GetChatMessagesListQuery.ChatMessageListDto>
                        (payload, item => item.id === payload.id)
                })
            );
        }
    }

}
