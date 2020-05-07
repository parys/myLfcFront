import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

export namespace RightSidebarActions {

    export class GetLatestCommentList {
        static readonly type = '[RightSidebar] Get latest comments list';
    }

    export class GetUserBirthdays {
        static readonly type = '[RightSidebar] Get user birthdays';
    }

    export class SetOnlineUsers {
        static readonly type = '[RightSidebar] Set online users list';
        constructor(public readonly payload: UsersOnline) { }
    }

    export class GetOnlineUsers {
        static readonly type = '[RightSidebar] Get online users';
    }

    export class PutToLatestComments {
        static readonly type = '[RightSidebar] Put new comment to latest';
        constructor(public readonly payload: GetLatestCommentListQuery.LastCommentListDto) { }
    }

}