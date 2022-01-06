import { BasePerson } from './base-person.model';

export class Person extends BasePerson {
    public birthday: Date;
    public firstName: string;
    public firstRussianName: string;
    public lastName: string;
    public lastRussianName: string;
    public type: number;
    public typeName: string;
    public photo: string;
    public name: string;
    public russianName: string;
    public title: string;
    public position: string;
    public country: string;
}
