import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { USERS_ROUTE, COMMENTS_ROUTE } from '@constants/routes.constants';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { GetUserBirthdaysQuery } from '@network/shared/right-sidebar/get-users-birthdays.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

@Injectable()
export class SidebarRightService {
    constructor(private http: HttpWrapper) {
    }

    public getUsersBirthdays(): Observable<GetUserBirthdaysQuery.Response> {
        return this.http.get<GetUserBirthdaysQuery.Response>(`${USERS_ROUTE}/birthdays`);
    }

    public getOnlineCount(): Observable<UsersOnline> {
        return this.http.get<UsersOnline>(`${USERS_ROUTE}/online`);
    }

    public getLastComments(): Observable<GetLatestCommentListQuery.Response> {
        return this.http.get<GetLatestCommentListQuery.Response>(COMMENTS_ROUTE + '/last');
    }
}
