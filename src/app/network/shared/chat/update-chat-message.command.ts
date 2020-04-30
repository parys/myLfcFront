import { UpsertChatMessageCommand } from './upsert-chat-message.command';

export namespace UpdateChatMessageCommand {

    export class Request extends UpsertChatMessageCommand.Request {
        public id: number;
    }

    export class Response extends UpsertChatMessageCommand.Response {

    }
}
