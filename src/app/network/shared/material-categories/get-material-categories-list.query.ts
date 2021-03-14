import { BaseEntity, MaterialType } from '@domain/models';

export namespace GetMaterialCategoriesListQuery {

    export class Request extends BaseEntity<Request> {
        public materialType: MaterialType;
    }


    export class Response extends BaseEntity<Response> {
        public results: MaterialCategoryListDto[] = [];
     }


    export class MaterialCategoryListDto extends BaseEntity<MaterialCategoryListDto> {

        public id: number;
        public name: string;
        public itemsCount: number;
        public materialType: MaterialType;
    }


}
