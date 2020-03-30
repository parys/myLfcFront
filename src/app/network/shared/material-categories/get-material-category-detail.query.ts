import { BaseEntity } from '@domain/models';

export namespace GetMaterialCategoryDetailQuery {

    export class Request extends BaseEntity<Request> {

        public id: number;
    }


    export class Response extends BaseEntity<Response> {
        public id: number;
        public name: string;

    }
}
