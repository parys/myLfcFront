import { GetMatchPersonsListQuery } from '@network/shared/match-persons/get-match-persons-list.query';

export class MatchPerson extends GetMatchPersonsListQuery.MatchPersonListDto {
    public placeType: number;
    public personTypeName: string;
}
