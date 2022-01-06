import { PagedResult, PagedQueryBase, BaseEntity } from '@domain/models';

export namespace GetCommentListByEntityIdQuery {

    export class Request extends BaseEntity<Request> implements PagedQueryBase {

        public currentPage: number;

        public sortOn: string;

        public sortDirection: string;

        public pageSize: number;

        public skipCount: number;

        public rowCount: number;

        public matchId?: number;

        public materialId?: number;

        public onlyUnverified: boolean;

        public userId: number;
    }

    export class Response extends PagedResult<CommentListDto> { }

    export class CommentListDto extends BaseEntity<CommentListDto> {

        public id: number;

        public number: number;

        public additionTime: Date;

        public lastModified: Date;

        public authorUserName: string;

        public authorId: number;

        public photo: string;

        public message: string;

        public answer: string;

        public materialId: number;

        public matchId: number;

        public parentId: number;

        public children: CommentListDto[] = [];

        public isVerified: boolean;

        public canPositiveVote: boolean;

        public canNegativeVote: boolean;

        public positiveCount: number;

        public negativeCount: number;

        public type: number;

        public typeName: string;
    }

}
