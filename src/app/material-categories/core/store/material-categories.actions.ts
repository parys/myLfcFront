import { MaterialType } from '@domain/models/material-type.enum';

export namespace MaterialCategoryActions {

    export class GetMaterialCategoriesList {
        static readonly type = '[MaterialCategories] Get material categories list';
        constructor(public readonly payload: MaterialType) { }
    }

    export class GetMaterialCategoryById {
        static readonly type = '[MaterialCategories] Get material category by id';
        constructor(public readonly payload: number) { }
    }

    export class DeleteMaterialCategory {
        static readonly type = '[MaterialCategories] Delete material category';
        constructor(public readonly payload: number) { }
    }
}