import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { USERS_ROUTE, COMMENTS_ROUTE } from '@constants/routes.constants';
import { User, UsersOnline } from '@domain/models';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';

@Injectable()
export class SidebarRightService {
    constructor(private http: HttpWrapper) {
    }

    public getUsersBirthdays(): Observable<User[]> {
        return this.http.get<User[]>(`${USERS_ROUTE}/birthdays`);
    }

    public getOnlineCount(): Observable<UsersOnline> {
        return this.http.get<UsersOnline>(`${USERS_ROUTE}/online`);
    }

    public getLastComments(): Observable<GetLatestCommentListQuery.Response> {
        return this.http.get<GetLatestCommentListQuery.Response>(COMMENTS_ROUTE + '/last');
    }
}
