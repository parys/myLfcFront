import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MaterialType, Material } from '@domain/models';
import { HttpWrapper } from '@base/httpWrapper';
import { MATERIALS_ROUTE } from '@constants/routes.constants';

@Injectable()
export class MaterialEditService {
    private actionUrl: string;

    constructor(private http: HttpWrapper) {
        this.actionUrl = MATERIALS_ROUTE + '/';
    }

    public create(item: Material, type: MaterialType): Observable<Material> {
        return this.http.post<Material>(`${this.actionUrl}${MaterialType[type]}/`, JSON.stringify(item));
    }

    public update(id: number, itemToUpdate: Material): Observable<Material> {
        return this.http.put<Material>(this.actionUrl + id, JSON.stringify(itemToUpdate));
    }

    public extractPhoto(url: string): Observable<string[]> {
        return this.http.get<string[]>(this.actionUrl + 'imageLinks/' + url);
    }
}
