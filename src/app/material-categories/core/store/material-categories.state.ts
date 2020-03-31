import { Injectable } from '@angular/core';

import { State, Selector, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { removeMany } from '@domain/operators/remove-from-many';
import { ShowNotice } from '@notices/store';
import { NoticeMessage } from '@notices/shared';
import { CustomTitleMetaService } from '@core/services';

import { MaterialCategoriesStateModel } from './material-categories-state.model';
import { MaterialCategoryActions } from './material-categories.actions';
import { MaterialCategoryService } from '../material-сategory.service';
import { GetMaterialCategoriesListQuery, GetMaterialCategoryDetailQuery } from '@network/shared/material-categories';

@State<MaterialCategoriesStateModel>({
    name: 'materialCategories',
    defaults: {
        materialCategories: [],
        materialCategory: null,
    },
})
@Injectable()
export class MaterialCategoriesState {

    @Selector()
    static materialCategory(state: MaterialCategoriesStateModel) {
        return state.materialCategory;
    }

    @Selector()
    static materialCategories(state: MaterialCategoriesStateModel) {
        return state.materialCategories;
    }

    constructor(protected network: MaterialCategoryService,
                protected titleService: CustomTitleMetaService ) { }


    @Action(MaterialCategoryActions.GetMaterialCategoriesList)
    onGetMaterialCategoriesList(ctx: StateContext<MaterialCategoriesStateModel>,
         { payload }: MaterialCategoryActions.GetMaterialCategoriesList) {

        return this.network.getAll(new GetMaterialCategoriesListQuery.Request({materialType: payload}))
            .pipe(
                tap(response => {
                    ctx.patchState({ materialCategories: response.results || [] });
                }));
    }

    @Action(MaterialCategoryActions.GetMaterialCategoryById)
    onGetMaterialCategoryById({ patchState }: StateContext<MaterialCategoriesStateModel>,
         { payload }: MaterialCategoryActions.GetMaterialCategoryById) {
        return (payload ? this.network.getSingle(payload) : of(new GetMaterialCategoryDetailQuery.Response()))
            .pipe(
                tap(materialCategory => {
                    patchState({ materialCategory });

                    this.titleService.setTitle(materialCategory.name);
                })
            );
    }

    @Action(MaterialCategoryActions.DeleteMaterialCategory)
    onDeleteMaterialCategory({ setState, getState, patchState, dispatch }: StateContext<MaterialCategoriesStateModel>,
         { payload }: MaterialCategoryActions.DeleteMaterialCategory) {
        return this.network.delete(payload).pipe(
            tap(result => {
                const { materialCategory } = getState();
                if (result && materialCategory && payload === materialCategory.id) {
                    patchState({ materialCategory: null });
                }
                setState(
                    patch({
                        materialCategories: removeMany<GetMaterialCategoriesListQuery.MaterialCategoryListDto>
                            (item => item.id === payload)
                    })
                );
                dispatch(new ShowNotice(NoticeMessage.success('Категория удалена', '')));
            })
        );
    }
}
