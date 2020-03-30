import { Injectable } from '@angular/core';

import { MaterialCategory, MaterialCategoryFilter } from '@domain/models';
import { HttpWrapper } from '@base/httpWrapper';
import { MATERIAL_CATEGORIES_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';

import { GetMaterialCategoriesListQuery, GetMaterialCategoryDetailQuery } from '@network/shared/material-categories';
import { Observable } from 'rxjs';

@Injectable()
export class MaterialCategoryService extends BaseRestService<MaterialCategory, MaterialCategoryFilter> {
    private readonly actionUrl = MATERIAL_CATEGORIES_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, MATERIAL_CATEGORIES_ROUTE + '/');
    }

    // new approach
    public getAll2(request: GetMaterialCategoriesListQuery.Request): Observable<GetMaterialCategoriesListQuery.Response> {
        return this.http.getWithParams<GetMaterialCategoriesListQuery.Response>(this.actionUrl, request);
    }

    public getSingle2(id: number): Observable<GetMaterialCategoryDetailQuery.Response> {
        return this.http.get<GetMaterialCategoryDetailQuery.Response>(this.actionUrl + id);
    }

}
