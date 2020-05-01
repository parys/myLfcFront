import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { GetUserBirthdaysQuery } from '@network/shared/right-sidebar/get-users-birthdays.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

export interface RightSidebarStateModel {
    latestComments: GetLatestCommentListQuery.LastCommentListDto[];
    userBirthdays: GetUserBirthdaysQuery.UserBirthdayDto[];
    usersOnline: UsersOnline;
}
