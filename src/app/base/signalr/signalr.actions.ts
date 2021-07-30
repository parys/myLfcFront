import { MatchEvent } from '@domain/models/match-event.model';
import { MatchPerson } from '@match-persons/models/match-person.model';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { GetMatchDetailQuery } from '@network/shared/matches';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';
import { SignalrEntity } from './models';

export namespace SignalRActions {

    export class UpdateME {
        static readonly type = '[Signal R] Update match event by signalR';
        constructor(public payload: SignalrEntity<MatchEvent>) {}
    }

    export class UpdateMP {
        static readonly type = '[Signal R] Update match person by signalR';
        constructor(public payload: SignalrEntity<MatchPerson>) {}
    }

    export class UpdateMatch {
        static readonly type = '[Signal R] Update match by signalR';
        constructor(public payload: SignalrEntity<GetMatchDetailQuery.Response>) {}
    }

    export class UpdateComment {
        static readonly type = '[Signal R] Update comment by signarR';
        constructor(public payload: SignalrEntity<GetCommentListByEntityIdQuery.CommentListDto>) {}
    }

    export class UpdateChat {
        static readonly type = '[Signal R] Put new message to chat';
        constructor(public readonly payload: GetChatMessagesListQuery.ChatMessageListDto) { }
    }

    export class SetOnlineUsers {
        static readonly type = '[Signal R] Set online users list';
        constructor(public readonly payload: UsersOnline) { }
    }
}
