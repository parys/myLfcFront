import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MaterialFilters, Material, PagedList } from '@domain/models';
import { HttpWrapper } from '@base/httpWrapper';
import { GetMaterialsListQuery, GetMaterialDetailQuery, GetOtherMaterialsListQuery } from '@network/shared/materials';
import { MaterialCoreService } from '@materials/core';

@Injectable()
export class MaterialService extends MaterialCoreService {

    constructor(protected http: HttpWrapper) {
        super(http);
    }

    public getAll(filters: MaterialFilters | any): Observable<PagedList<Material>> {
        return this.http.getWithParams<PagedList<Material>>(this.actionUrl, filters );
    }

    public getOthers(): Observable<GetOtherMaterialsListQuery.Response> {
        return this.http.get<GetOtherMaterialsListQuery.Response>(this.actionUrl + 'others/' );
    }

    public getSingle(id: number): Observable<Material> {
        return this.http.get<Material>(this.actionUrl + id);
    }

    public addView(id: number): Observable<boolean> {
        return this.http.patch<boolean>(this.actionUrl + id + '/read', {});
    }

    // new approach
    public getAll2(request: GetMaterialsListQuery.Request): Observable<GetMaterialsListQuery.Response> {
        return this.http.getWithParams<GetMaterialsListQuery.Response>(this.actionUrl, request);
    }

    public getSingle2(id: number): Observable<GetMaterialDetailQuery.Response> {
        return this.http.get<GetMaterialDetailQuery.Response>(this.actionUrl + id);
    }
}
