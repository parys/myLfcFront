import { BaseEntity } from '@domain/models';

export namespace ToggleHideTeamsCommand {

    export class Request extends BaseEntity<Request> {

        public matchId: number;

    }


    export class Response extends BaseEntity<Response> {
        public result: boolean;
    }
}
