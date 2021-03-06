import { SignalrEntity } from "@base/signalr/models";
import { MatchEvent } from "@domain/models/match-event.model";

export namespace MatchEventActions {
    export class GetTypesList {
        static readonly type = '[Match Events] Get match event types list';
    }

    export class GetList {
        static readonly type = '[Match Events] Get match events list';
        constructor(public payload: number) { }
    }

    export class Remove {
        static readonly type = '[Match Events] Remove match event';
        constructor(public payload: number) { }
    }
    
    export class Add {
        static readonly type = '[Match Events] Add match event';
        constructor(public payload: MatchEvent) { }
    }
    
    export class Edit {
        static readonly type = '[Match Events] Edit match event';
        constructor(public payload: MatchEvent) { }
    }

    export class StartEdit {
        static readonly type = '[Match Events] Start add or edit';
        constructor(public payload: MatchEvent) {}
    }
}
