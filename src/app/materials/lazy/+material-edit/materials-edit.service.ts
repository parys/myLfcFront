import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Material } from '@domain/models/material.model';
import { HttpWrapper } from '@base/httpWrapper';
import { MATERIALS_ROUTE, USERS_ROUTE } from '@constants/routes.constants';
import { UserFilters } from '@users/models/user-filters.model';
import { PagedList } from '@domain/models/pagedList.model';
import { User } from '@users/models/user.model';

@Injectable()
export class MaterialEditService {
    private actionUrl: string;

    constructor(private http: HttpWrapper) {
        this.actionUrl = MATERIALS_ROUTE + '/';
    }

    public createOrUpdate(itemToUpdate: Material, id: number): Observable<Material> {
        const item = JSON.stringify(itemToUpdate);
        if (id > 0) {
            return this.http.put<Material>(this.actionUrl + id, item);
        } else {
            return this.http.post<Material>(`${this.actionUrl}`, item);
        }
    }

    public extractPhoto(url: string): Observable<string[]> {
        return this.http.get<string[]>(this.actionUrl + 'imageLinks/' + url);
    }


    public getUsers(filters: UserFilters): Observable<PagedList<User>> { //copy paste, need to switch to select-user widget
        return this.http.getWithParams<PagedList<User>>(USERS_ROUTE, filters);
    }
}
