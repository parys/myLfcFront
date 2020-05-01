import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';

@Component({
    selector: '<comment-last>',
    templateUrl: './comment-last.component.html',
    styleUrls: ['./comment-last.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentLastComponent {

    @Input() comments: GetLatestCommentListQuery.LastCommentListDto[];
}
