import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { CreateChatMessageCommand } from '@network/shared/chat/create-chat-message.command';
import { UpdateChatMessageCommand } from '@network/shared/chat/update-chat-message.command';

export namespace ChatActions {

    export class GetChatList {
        static readonly type = '[Chat] Set chat messages';
        constructor(public payload: GetChatMessagesListQuery.Request) { }
    }

    export class CreateChatMessage {
        static readonly type = '[Chat] Create chat message by id';
        constructor(public readonly payload: CreateChatMessageCommand.Request) { }
    }

    export class UpdateChatMessage {
        static readonly type = '[Chat] Update chat message by id';
        constructor(public readonly payload: UpdateChatMessageCommand.Request) { }
    }

    export class DeleteChatMessage {
        static readonly type = '[Chat] Delete chat message';
        constructor(public readonly payload: number) { }
    }

    export class PutToChatMessage {
        static readonly type = '[Chat] Put new message to chat';
        constructor(public readonly payload: GetChatMessagesListQuery.ChatMessageListDto) { }
    }

}
