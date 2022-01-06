import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { Person, SquadList, PersonType, PersonFilters } from '@domain/models';
import { PERSONS_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';

@Injectable()
export class PersonEditService {
    private actionUrl: string = PERSONS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
    }

    // public setBestPlayer(personId: number): Observable<boolean> {
    //     return this.http.put<boolean>(`${this.actionUrl}bestPlayer/${personId}`, '');
    // }

    // public getTypes(): Observable<PersonType[]> {
    //     return this.http.get<PersonType[]>(this.actionUrl + 'types/');
    // }

    public parseAcademy(url: string): Observable<Person> {
        return this.http.get<Person>(`${this.actionUrl}parseAcademy?url=${url}`);
    }

    public getTypes(): Observable<PersonType[]> {
        return this.http.get<PersonType[]>(this.actionUrl + 'types/');
    }


}
