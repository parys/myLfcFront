import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';

export interface ChatStateModel {
    miniMessages: GetChatMessagesListQuery.ChatMessageListDto[];
    maxiMessages: GetChatMessagesListQuery.ChatMessageListDto[];
}
