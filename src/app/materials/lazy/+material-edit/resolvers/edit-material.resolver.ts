import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { GetMatchDetailQuery } from '@network/shared/matches';

import { GetMaterialDetailQuery } from '@network/shared/materials/get-material-detail.query';
import { GetMaterialById } from '@materials/lazy/store';
import { MaterialType } from '@domain/models/material-type.enum';
import { MaterialCategoryActions } from '@material-categories/core/store';


@Injectable()
export class EditMaterialResolver  {

    constructor(private store: Store) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetMatchDetailQuery.Response> {
        const payload = new GetMaterialDetailQuery.Request({ id: route.params.id });
        let type: MaterialType;

        if (state.url.startsWith('/news')) {
            type = MaterialType.News;
        } else if (state.url.startsWith('/blogs')) {
            type = MaterialType.Blogs;
        }

        return this.store.dispatch([
            new GetMaterialById(payload),
            new MaterialCategoryActions.GetMaterialCategoriesList(type)
       ]);
    }

}
