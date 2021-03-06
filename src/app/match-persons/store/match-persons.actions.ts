import { UpdateMatchPersonCommand } from '@network/shared/match-persons';
import { MatchPerson } from '@domain/models/match-person.model';

export namespace MatchPersonActions {
    export class GetTypesList {
        static readonly type = '[Match Persons] Get match person types list';
    }

    export class GetList {
        static readonly type = '[Match Persons] Get match persons list';
        constructor(public payload: number) { }
    }

    export class AddEdit {
        static readonly type = '[Match Persons] Update or create match person';
        constructor(public payload: UpdateMatchPersonCommand.Request) { }
    }

    export class Delete {
        static readonly type = '[Match Persons] Delete match person';
        constructor(public payload: MatchPerson) { }
    }

    export class PushMatchPerson {
        static readonly type = '[Match Persons] Push  match person';
        constructor(public payload: MatchPerson) { }
    }

    export class SetEditOptions {
        static readonly type = '[Match Persons] Set edit options';
        constructor(public payload: { mpType: number, currentCount: number, neededCount: number, personTypeId: number }) { }
    }

    export class CancelEdit {
        static readonly type = '[Match Persons] Cancel edit';
    }

    export class SetSelectedPerson {
        static readonly type = '[Match Persons] Set selected  person';
        constructor(public payload: MatchPerson) { }
    }
}
