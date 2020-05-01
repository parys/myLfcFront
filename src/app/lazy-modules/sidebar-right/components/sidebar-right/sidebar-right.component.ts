import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthService } from '@base/auth';
import { AuthState } from '@auth/store';
import { RightSidebarState, RightSidebarActions } from '@lazy-modules/sidebar-right/store';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { GetUserBirthdaysQuery } from '@network/shared/right-sidebar/get-users-birthdays.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

@Component({
    selector: 'sidebar-right',
    templateUrl: './sidebar-right.component.html',
    styleUrls: ['./sidebar-right.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRightComponent implements OnInit {

    @Select(AuthState.userId) userId$: Observable<number>;

    @Select(RightSidebarState.latestComments) latestComments$: Observable<GetLatestCommentListQuery.LastCommentListDto[]>;

    @Select(RightSidebarState.userBirthdays) userBirthdays$: Observable<GetUserBirthdaysQuery.UserBirthdayDto[]>;

    @Select(RightSidebarState.usersOnline) usersOnline$: Observable<UsersOnline>;

    constructor(private authService: AuthService, private store: Store) {

    }

    public ngOnInit(): void {
        this.store.dispatch([new RightSidebarActions.GetLatestCommentList(),
            new RightSidebarActions.GetUserBirthdays(),
            new RightSidebarActions.GetOnlineUsers()
        ]);
    }

    public logout(): void {
        this.authService.logout();
    }
}
