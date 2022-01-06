import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { AuthState } from '@auth/store';
import { CoreState } from '@core/store';

@Component({
    selector: 'admin-top-panel',
    templateUrl: './admin-top-panel.component.html',
    styleUrls: ['./admin-top-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'class': 'admin-top-panel'}
})

export class AdminTopPanelComponent {

    @Select(AuthState.isNewsmaker) isNewsmaker$: Observable<boolean>;

    @Select(AuthState.isInformer) isInformer$: Observable<boolean>;

    @Select(CoreState.signalr) signalr$: Observable<boolean>;
}
