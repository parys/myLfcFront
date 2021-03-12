import { MatchPersonType } from '@match-persons/models/match-person-type.model';
import { GetMatchPersonsListQuery } from '@network/shared/match-persons';

export interface MatchPersonsStateModel {
    matchPersonTypes: MatchPersonType[];
    matchPersons: Record<number, GetMatchPersonsListQuery.MatchPersonListDto[]>;
    selected: GetMatchPersonsListQuery.MatchPersonListDto;
    editOptions: {
        mpType: number,
        currentCount: number,
        neededCount: number,
        personTypeId: number
    };
}
