import { BaseEntity } from '@domain/models';


export namespace GetLatestCommentListQuery {


    export class Request extends BaseEntity<Request>{

    }


    export class Response extends BaseEntity<Response> {

        public results: LastCommentListDto[];
     }


    export class LastCommentListDto extends BaseEntity<LastCommentListDto> {

        public id: number;

        public authorUserName: string;

        public authorId: number;

        public message: string;

        public materialId?: number;

        public matchId?: number;

        public type: number;

        public typeName: string;

        public clippedMessage: string;

    }
}
