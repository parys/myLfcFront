import { Injectable } from '@angular/core';

import { MaterialCategory } from '@domain/models/material-category.model';
import { HttpWrapper } from '@base/httpWrapper';
import { MATERIAL_CATEGORIES_ROUTE } from '@constants/routes.constants';

import { GetMaterialCategoriesListQuery, GetMaterialCategoryDetailQuery } from '@network/shared/material-categories';
import { Observable } from 'rxjs';

@Injectable()
export class MaterialCategoryService {
    private readonly actionUrl = MATERIAL_CATEGORIES_ROUTE + '/';

    constructor(public http: HttpWrapper) {
    }

    public getAll(request: GetMaterialCategoriesListQuery.Request): Observable<GetMaterialCategoriesListQuery.Response> {
        return this.http.getWithParams<GetMaterialCategoriesListQuery.Response>(this.actionUrl, request);
    }

    public getSingle(id: number): Observable<GetMaterialCategoryDetailQuery.Response> {
        return this.http.get<GetMaterialCategoryDetailQuery.Response>(this.actionUrl + id);
    }

    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.actionUrl + id);
    }

    public createOrUpdate(id: number, item: MaterialCategory): Observable<MaterialCategory> {
        const stringify = JSON.stringify(item);
        if (+id > 0) {
            return this.http.put<MaterialCategory>(this.actionUrl + id, stringify);
        } else {
            return this.http.post<MaterialCategory>(this.actionUrl, stringify);
        }
    }

}
