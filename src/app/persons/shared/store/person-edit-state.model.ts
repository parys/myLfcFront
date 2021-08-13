import { PersonType } from '@domain/models/person-type.model';
import { Person } from '@domain/models/person.model';

export interface PersonEditStateModel {
    types: PersonType[];
    person: Person;
}
