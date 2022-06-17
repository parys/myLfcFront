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
import { SignalRActions } from '@base/signalr/signalr.actions';


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
    onGetChatList({ patchState }: StateContext<ChatStateModel>, { payload }: ChatActions.GetChatList) {
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
        return this.chatService.create(payload);
    }

    @Action(ChatActions.UpdateChatMessage)
    onUpdateMessage({ dispatch }: StateContext<ChatStateModel>, { payload }: ChatActions.UpdateChatMessage) {
        return this.chatService.update(payload.id, payload).pipe(
            tap(_ => {
                dispatch(new ShowNotice(NoticeMessage.success('Cообщение обновлено', '')));
            })
        );
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

    @Action(SignalRActions.UpdateChat)
    onUpdateChat({ setState, getState, patchState }: StateContext<ChatStateModel>, { payload }: SignalRActions.UpdateChat) {
        if (payload.type === ChatMessageType.Mini) {

            const { miniMessages } = getState();
            const existingIndex = miniMessages.findIndex(item => item.id === payload.id);
            if (existingIndex >= 0) {
                return setState(patch({ miniMessages: updateItem(existingIndex, payload) }));
            } else {
                return patchState({ miniMessages: [payload, ...miniMessages]});
            }
        } else if (payload.type === ChatMessageType.Big) {
            const { maxiMessages } = getState();
            const existingIndex = maxiMessages.findIndex(item => item.id === payload.id);
            if (existingIndex >= 0) {
                return setState(patch({ maxiMessages: updateItem(existingIndex, payload) }));
            } else {
                return patchState({ maxiMessages: [payload, ...maxiMessages]});
            }
        }
    }

}
