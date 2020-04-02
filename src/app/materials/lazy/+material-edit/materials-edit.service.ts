import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Material } from '@domain/models/material.model';
import { HttpWrapper } from '@base/httpWrapper';
import { MATERIALS_ROUTE } from '@constants/routes.constants';

@Injectable()
export class MaterialEditService {
    private actionUrl: string;

    constructor(private http: HttpWrapper) {
        this.actionUrl = MATERIALS_ROUTE + '/';
    }

    public createOrUpdate(itemToUpdate: Material, id: number): Observable<Material> {
        const item = JSON.stringify(itemToUpdate);
        if(id > 0) {
            return this.http.put<Material>(this.actionUrl + id, JSON.stringify(itemToUpdate));

        } else {
            return this.http.post<Material>(`${this.actionUrl}`, JSON.stringify(item));
        }
    }

    public extractPhoto(url: string): Observable<string[]> {
        return this.http.get<string[]>(this.actionUrl + 'imageLinks/' + url);
    }
}
