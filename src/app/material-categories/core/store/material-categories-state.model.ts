import { GetMaterialCategoriesListQuery, GetMaterialCategoryDetailQuery } from '@network/shared/material-categories';

export interface MaterialCategoriesStateModel {
    materialCategories: GetMaterialCategoriesListQuery.MaterialCategoryListDto[];
    materialCategory: GetMaterialCategoryDetailQuery.Response;
}
