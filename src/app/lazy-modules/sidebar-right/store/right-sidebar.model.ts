import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';

export interface RightSidebarStateModel {
    latestComments: GetLatestCommentListQuery.LastCommentListDto[]
}
