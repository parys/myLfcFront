import { BaseEntity } from '@domain/models';

export namespace UpdateMatchPersonCommand {

    export class Request extends BaseEntity<Request> {
        public matchId: number;

        public personId: number;

        public personType: number;

        public isHome: boolean;

        public order: number;
    }

    export class Response extends BaseEntity<Response> {
        public personId: number;

        public number?: number;

        public personName: string;

        public type: number;
    }
}
