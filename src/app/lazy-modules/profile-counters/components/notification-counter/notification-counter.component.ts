import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { CountersState } from '@lazy-modules/profile-counters/store';

@Component({
    selector: 'notification-counter',
    templateUrl: './notification-counter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationCounterComponent  {

    @Select(CountersState.notificationsCount) notificationsCount$: Observable<number>;

    constructor() { }
}
