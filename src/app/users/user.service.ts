import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { USERS_ROUTE } from '@constants/routes.constants';

import { User } from '@users/models/user.model';
import { GetUsersListQuery, GetUserDetailQuery } from '@network/shared/users';
import { UserConfig } from './models/user-config.model';

@Injectable()
export class UserService {
    private actionUrl: string = USERS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
    }

    public update(id: number, item: User): Observable<User> {
        const stringify = JSON.stringify(item);
        return this.http.put<User>(this.actionUrl + id, stringify);
    }

    public updateRoleGroup(id: number, roleGroupId: number): Observable<boolean> {
        return this.http.put<boolean>(`${this.actionUrl}${id}/roleGroup/${roleGroupId}`, '');
    }

    public ban(id: number, days: number): Observable<boolean> {
        return this.http.put<boolean>(`${this.actionUrl}${id}/ban/${days}`, '');
    }

    public unban(id: number): Observable<boolean> {
        return this.http.put<boolean>(`${this.actionUrl}${id}/unban`, '');
    }

    public resetAvatar(id: number): Observable<object> {
        return this.http.put<object>(`${this.actionUrl}${id}/resetAvatar`, '');
    }

    public updateAvatar(file: File): Observable<object> {
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        return this.http.post<object>(`${this.actionUrl}avatar/`, formData, true);
    }

    public getConfig(): Observable<UserConfig> {
        return this.http.get<UserConfig>(`${this.actionUrl}config`);
    }

    public updateConfig(itemToUpdate: UserConfig): Observable<UserConfig> {
        return this.http.put<UserConfig>(`${this.actionUrl}config`, JSON.stringify(itemToUpdate));
    }

    // new approach
    public getAll2(request: GetUsersListQuery.Request): Observable<GetUsersListQuery.Response> {
        return this.http.getWithParams<GetUsersListQuery.Response>(this.actionUrl, request);
    }

    public getSingle2(id: number): Observable<GetUserDetailQuery.Response> {
        return this.http.get<GetUserDetailQuery.Response>(this.actionUrl + id);
    }
}
