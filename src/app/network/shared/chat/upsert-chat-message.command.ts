import { BaseEntity } from '@domain/models';

export namespace UpsertChatMessageCommand {

    export class Request extends BaseEntity<Request> {
        public message: string;
        public type: number;
    }

    export class Response extends BaseEntity<Response> {
        public id: number;
    }
}
