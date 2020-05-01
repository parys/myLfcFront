import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthService } from '@base/auth';
import { AuthState } from '@auth/store';
import { RightSidebarState, RightSidebarActions } from '@lazy-modules/sidebar-right/store';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { GetUserBirthdaysQuery } from '@network/shared/right-sidebar/get-users-birthdays.query';

@Component({
    selector: 'sidebar-right',
    templateUrl: './sidebar-right.component.html',
    styleUrls: ['./sidebar-right.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRightComponent {

    @Select(AuthState.userId) userId$: Observable<number>;

    @Select(RightSidebarState.latestComments) latestComments$: Observable<GetLatestCommentListQuery.LastCommentListDto[]>;

    @Select(RightSidebarState.userBirthdays) userBirthdays$: Observable<GetUserBirthdaysQuery.UserBirthdayDto[]>;

    constructor(private authService: AuthService, private store: Store) {
        this.store.dispatch([new RightSidebarActions.GetLatestCommentList(),
            new RightSidebarActions.GetUserBirthdays()])
    }

    public logout(): void {
        this.authService.logout();
    }
}
