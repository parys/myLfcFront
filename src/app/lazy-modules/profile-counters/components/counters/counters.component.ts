import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetUnreadNotificationsCount, GetUnreadPmsCount } from '@lazy-modules/profile-counters/store';

@Component({
    selector: 'counters',
    styleUrls: ['./counters.component.scss'],
    templateUrl: './counters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountersComponent {

    constructor(private store: Store) {
        this.store.dispatch([new GetUnreadNotificationsCount(), new GetUnreadPmsCount()]);
    }
}
