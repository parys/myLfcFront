﻿import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { PagedList } from '@domain/models';
import { SEASONS_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { Season } from './models/season.model';
import { SeasonFilters } from './models/season-filters.model';
import { SeasonStatistics } from './models/season-statistics.model';

@Injectable()
export class SeasonService extends BaseRestService<Season, SeasonFilters> {
    private actionUrl: string = SEASONS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, SEASONS_ROUTE + '/');
    }

    public getAllWithoutFilter(): Observable<PagedList<Season>> {
        return this.http.get<PagedList<Season>>(`${this.actionUrl}`);
    }

    public getSingleWithMatches(seasonId: number): Observable<Season> {
        return this.http.get<Season>(`${this.actionUrl}getWithMatches/${seasonId}`);
    }

    public getSingleCalendarWithMatches(seasonId: number): Observable<Season> {
        return this.http.get<Season>(`${this.actionUrl}${seasonId}/calendar`);
    }

    public getStatistics(seasonId: number): Observable<SeasonStatistics> {
        return this.http.get<SeasonStatistics>(`${this.actionUrl}${seasonId}/statistics`);
    }

    public setAsCurrent(id: number): Observable<boolean> {
        return this.http.put<boolean>(this.actionUrl + id + '/setAsCurrent', '');
    }

    public updateCalendar(): Observable<boolean> {
        return this.http.put<boolean>('matches/calendar', '');
    }
}
