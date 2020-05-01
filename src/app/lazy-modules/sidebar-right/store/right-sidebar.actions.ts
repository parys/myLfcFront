import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';

export namespace RightSidebarActions {

    export class GetLatestCommentList {
        static readonly type = '[RightSidebar] Get latest comments list';
    }

    // export class CreateChatMessage {
    //     static readonly type = '[RightSidebar] Create chat message by id';
    //     constructor(public readonly payload: CreateChatMessageCommand.Request) { }
    // }

    // export class UpdateChatMessage {
    //     static readonly type = '[RightSidebar] Update chat message by id';
    //     constructor(public readonly payload: UpdateChatMessageCommand.Request) { }
    // }

    // export class DeleteChatMessage {
    //     static readonly type = '[RightSidebar] Delete chat message';
    //     constructor(public readonly payload: number) { }
    // }

    export class PutToLatestComments {
        static readonly type = '[RightSidebar] Put new comment to latest';
        constructor(public readonly payload: GetLatestCommentListQuery.LastCommentListDto) { }
    }

}
