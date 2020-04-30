import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthState } from '@auth/store';
import { ChatState, ChatActions } from '@chat/store';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { ChatMessageType } from '@domain/enums/chat-message-type.enum';
import { CreateChatMessageCommand } from '@network/shared/chat/create-chat-message.command';
import { UpdateChatMessageCommand } from '@network/shared/chat/update-chat-message.command';

@Component({
    selector: 'mini-chat',
    templateUrl: './miniChat.component.html',
    styleUrls: ['./miniChat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniChatComponent {

    @Select(AuthState.isLogined) isLogined$: Observable<boolean>;

    @Select(AuthState.isModerator) isModerator$: Observable<boolean>;

    @Select(AuthState.userId) userId$: Observable<number>;

    @Select(ChatState.miniMessages) miniMessages$: Observable<GetChatMessagesListQuery.ChatMessageListDto[]>;

    constructor(private store: Store) {
        this.store.dispatch(new ChatActions.GetChatList({typeId: ChatMessageType.Mini,
             currentPage: 1, pageSize: 50, sortOn: null, sortDirection: null, lastMessageId: 0}));
    }

    public onCreateMessage(msg: CreateChatMessageCommand.Request): void {
        this.store.dispatch(new ChatActions.CreateChatMessage(msg));
    }

    public onUpdateMessage(msg: UpdateChatMessageCommand.Request): void {
        this.store.dispatch(new ChatActions.UpdateChatMessage(msg));
    }

    public onDeleteMessage(msgId: number): void {
        this.store.dispatch(new ChatActions.DeleteChatMessage(msgId));
    }
}
