import { MatchEvent } from "@domain/models/match-event.model";
import { MatchPerson } from "@domain/models/match-person.model";
import { SignalrEntity } from "./models";

export namespace SignalRActions {
    
    export class UpdateME {
        static readonly type = '[Signal R] Update match event by signalR';
        constructor(public payload: SignalrEntity<MatchEvent>) {}
    }
    
    export class UpdateMP {
        static readonly type = '[Signal R] Update match person by signalR';
        constructor(public payload: SignalrEntity<MatchPerson>) {}
    }
}