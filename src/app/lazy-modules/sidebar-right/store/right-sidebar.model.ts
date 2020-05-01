import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { GetUserBirthdaysQuery } from '@network/shared/right-sidebar/get-users-birthdays.query';

export interface RightSidebarStateModel {
    latestComments: GetLatestCommentListQuery.LastCommentListDto[];
    userBirthdays: GetUserBirthdaysQuery.UserBirthdayDto[];
}
