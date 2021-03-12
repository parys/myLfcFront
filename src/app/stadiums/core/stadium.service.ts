import { Injectable } from '@angular/core';

import { HttpWrapper } from '@base/httpWrapper';
import { STADIUMS_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { Stadium } from '@stadiums/models/stadium.model';
import { StadiumFilters } from '@stadiums/models/stadium-filters.model';

@Injectable()
export class StadiumService extends BaseRestService<Stadium, StadiumFilters> {
    private actionUrl: string = STADIUMS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, STADIUMS_ROUTE + '/');
    }
}
