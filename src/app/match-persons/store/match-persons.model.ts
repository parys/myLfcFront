import { BasePerson } from '@domain/models/base-person.model';
import { MatchPersonType } from '@match-persons/models/match-person-type.model';
import { GetMatchPersonsListQuery } from '@network/shared/match-persons';

export interface MatchPersonsStateModel {
    matchPersonTypes: MatchPersonType[];
    matchPersons: Record<number, GetMatchPersonsListQuery.MatchPersonListDto[]>;
    flatMatchPersons: GetMatchPersonsListQuery.MatchPersonListDto[];
    selected: BasePerson;
    editOptions: {
        mpType: number,
        currentCount: number,
        neededCount: number,
        personTypeId: number
    };
}
