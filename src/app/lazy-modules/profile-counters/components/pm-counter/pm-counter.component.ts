import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';

import { CountersState } from '@lazy-modules/profile-counters/store';

@Component({
    selector: 'pm-counter',
    templateUrl: './pm-counter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PmCounterComponent {

    @Select(CountersState.pmsCount) pmsCount$: Observable<number>;

    constructor() {
    }
}
