import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MaterialType } from '@domain/models/material-type.enum';
import { CustomTitleMetaService } from '@core/services';
import { AuthState } from '@auth/store';
import { MaterialCategoriesState, MaterialCategoryActions } from '@material-categories/core/store';
import { GetMaterialCategoriesListQuery } from '@network/shared/material-categories';
import { ObserverComponent } from '@domain/base';
import { NotifierService } from '@notices/services';
import { ConfirmationMessage } from '@notices/shared';

@Component({
    selector: 'material-сategory-list-page',
    templateUrl: './material-сategory-list-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialCategoryListPageComponent extends ObserverComponent implements OnInit {
    public type: MaterialType;

    @Select(AuthState.isEditor) isEditor$: Observable<boolean>;
    @Select(MaterialCategoriesState.materialCategories) categories$: Observable<GetMaterialCategoriesListQuery.MaterialCategoryListDto[]>;

    constructor(private router: Router,
        private store: Store,
        private notifierService: NotifierService,
        private titleService: CustomTitleMetaService) {
        super();
    }

    public ngOnInit(): void {
        if (this.router.url.startsWith('/newsCategories')) {
            this.titleService.setTitle('Категории новостей');
            this.type = MaterialType.News;
        } else if (this.router.url.startsWith('/blogCategories')) {
            this.titleService.setTitle('Категории блогов');
            this.type = MaterialType.Blogs;
        }
        this.store.dispatch(new MaterialCategoryActions.GetMaterialCategoriesList(this.type));
    }

    public onShowDeleteModal(id: number): void {
        const sub$ = this.notifierService.confirm(new ConfirmationMessage({ title: 'Удалить категорию?' }))
            .subscribe(result => {
                if (!result) {
                    return;
                }

                this.store.dispatch(new MaterialCategoryActions.DeleteMaterialCategory(id));
            });
        this.subscriptions.push(sub$);
    }
}
