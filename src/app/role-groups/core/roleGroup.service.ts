﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapper } from '@base/httpWrapper';
import { ROLE_GROUPS_ROUTE } from '@constants/routes.constants';
import { RoleGroup } from '@role-groups/models/role-group.model';

@Injectable()
export class RoleGroupService {
    private actionUrl: string = ROLE_GROUPS_ROUTE + '/';

    constructor(private http: HttpWrapper) {
    }

    public getAllWithRoles(): Observable<RoleGroup[]> {
        return this.http.get<RoleGroup[]> (this.actionUrl + '?includeRoles=true');
    }

    public getAll(): Observable<RoleGroup[]> {
        return this.http.get<RoleGroup[]> (this.actionUrl);
    }
}
