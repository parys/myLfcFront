import { BaseEntity } from '@domain/models';
import { BasePerson } from '@domain/models/base-person.model';


export namespace GetMatchPersonsListQuery {


    export class Request extends BaseEntity<Request>  {

        public matchId: number;
    }


    export class Response extends BaseEntity<Response> {
        public results: Record<number, GetMatchPersonsListQuery.MatchPersonListDto[]>;
        public flatListResults: GetMatchPersonsListQuery.MatchPersonListDto[];
    }


    export class MatchPersonListDto extends BasePerson {

        public personId: number;

        public personType: number;

        public matchId: number;

        public order: number;
    }


}
