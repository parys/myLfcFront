import { BaseEntity } from '@domain/models';


export namespace GetUserBirthdaysQuery {


    export class Request extends BaseEntity<Request>{

    }


    export class Response extends BaseEntity<Response> {

        public results: UserBirthdayDto[];
     }


    export class UserBirthdayDto extends BaseEntity<UserBirthdayDto> {

        public id: number;

        public userName: string;

        public photo: string;

    }
}
