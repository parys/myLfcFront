import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Material, PagedList } from '@domain/models';
import { HttpWrapper } from '@base/httpWrapper';
import { MATERIALS_ROUTE } from '@constants/routes.constants';

@Injectable()
export class MaterialCoreService {
    protected actionUrl: string;

    constructor(protected http: HttpWrapper) {
        this.actionUrl = MATERIALS_ROUTE + '/';
    }

    public getLatest(): Observable<PagedList<Material>> {
        return this.http.get<PagedList<Material>>(this.actionUrl + 'latest/');
    }

    public getTop(): Observable<PagedList<Material>> {
        return this.http.get<PagedList<Material>>(this.actionUrl + 'pinned/');
    }

    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.actionUrl + id);
    }

    public activate(id: number): Observable<boolean> {
        return this.http.patch<boolean>(this.actionUrl + id + '/activate', {});
    }
}
