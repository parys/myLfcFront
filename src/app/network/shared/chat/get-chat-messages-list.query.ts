import { BaseEntity, PagedResult } from '@domain/models';
import { PagedQueryBase } from '@base/infrastructure/paged-query-base.model';

export namespace GetChatMessagesListQuery {

    export class Request extends BaseEntity<Request> implements PagedQueryBase {
        public currentPage: number;
        public pageSize: number;
        public sortOn: string;
        public sortDirection: string;
        public typeId: number;
        public lastMessageId: number;
    }

    export class Response extends PagedResult<ChatMessageListDto> {

    }

    export class ChatMessageListDto extends BaseEntity<ChatMessageListDto> {

        public id: number;
        public authorId: number;
        public userName: string;
        public message: string;
        public additionTime: Date;
        public type: number;

    }
}