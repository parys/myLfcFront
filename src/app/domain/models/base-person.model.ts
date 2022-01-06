import { BaseEntity } from './base-entity.model';

export class BasePerson extends BaseEntity<BasePerson> {
    public id: number;
    public personId: number;
    public number?: number;
    public personName: string;
    public nickname: string;

}
