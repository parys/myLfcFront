import { Injectable } from '@angular/core';

import { HttpWrapper } from '@base/httpWrapper';
import { POLLS_ROUTE } from '@constants/routes.constants';
import { BaseRestService } from '@base/infrastructure';
import { Poll } from '@polls/models/poll.model';
import { PollFilters } from '@polls/models/poll-filters.model';

@Injectable()
export class PollService extends BaseRestService<Poll, PollFilters> {
    private actionUrl: string = POLLS_ROUTE + '/';

    constructor(public http: HttpWrapper) {
        super(http, POLLS_ROUTE + '/');
    }
}
