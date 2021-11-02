import { BaseEntity } from '@domain/models';


export namespace GetMatchDetailQuery {


    export class Request extends BaseEntity<Request> {

        public id: number;

    }


    export class Response extends BaseEntity<Response> {
        public id: number;
        public isHome: boolean;
        public clubId: number;
        public clubName: string;
        public homeClubId: number;
        public homeClubName: string;
        public homeClubLogo: string;
        public awayClubId: number;
        public awayClubName: string;
        public awayClubLogo: string;
        public dateTime: Date;
        public typeId: number;
        public typeName: string;
        public stadiumId: number;
        public stadiumName: string;
        public stadiumCity: string;
        public seasonId: number;
        public seasonName: string;
        public scoreHome: string;
        public scorePenaltyHome: number;
        public scoreAway: string;
        public scorePenaltyAway: number;
        public reportUrl: string;
        public photoUrl: string;
        public videoUrl: string;
        public previewId: string;
        public reportId: string;
        public hideTeams: boolean;
    }
}
