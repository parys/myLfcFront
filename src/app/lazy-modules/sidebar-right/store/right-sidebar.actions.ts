import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

export namespace RightSidebarActions {

    export class GetLatestCommentList {
        static readonly type = '[RightSidebar] Get latest comments list';
    }

    export class GetUserBirthdays {
        static readonly type = '[RightSidebar] Get user birthdays';
    }

    export class GetOnlineUsers {
        static readonly type = '[RightSidebar] Get online users';
    }

}
