
export namespace MatchEventActions {
    export class GetMatchEventTypesList {
        static readonly type = '[Match Events] Get match event types list';
    }

    export class GetMatchEventsList {
        static readonly type = '[Match Events] Get match events list';
        constructor(public payload: number) { }
    }
}
