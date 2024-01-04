import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { GetMaterialDetailQuery } from '@network/shared/materials';

import { GetMaterialById } from '@materials/lazy/store/materials.actions';
import { CommentActions } from '@comments/shared/store';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';


@Injectable()
export class MaterialResolver  {

    constructor(private store: Store) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<GetMaterialDetailQuery.Response> {
        const payload = new GetMaterialDetailQuery.Request({ id: route.params.id });
        return this.store.dispatch([
            new GetMaterialById(payload),
            new CommentActions.GetCommentsListByEntity(new GetCommentListByEntityIdQuery.Request({materialId: route.params.id}))
        ]);
    }

}
