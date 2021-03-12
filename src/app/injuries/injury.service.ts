import { Injectable } from '@angular/core';

import { HttpWrapper } from '@base/httpWrapper';
import { INJURIES_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { Injury } from './models/injury.model';
import { InjuryFilters } from './models/injury-filters.model';

@Injectable()
export class InjuryService extends BaseRestService<Injury, InjuryFilters> {
    private actionUrl: string = INJURIES_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, INJURIES_ROUTE + '/');
    }

}
