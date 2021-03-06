import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatchEvent, MatchEventType } from '@domain/models';

import { Observable } from 'rxjs';
import { AuthState } from '@auth/store';
import { Select, Store } from '@ngxs/store';
import { ConfirmationMessage } from '@notices/shared';
import { NotifierService } from '@notices/services';
import { ObserverComponent } from '@domain/base';
import { MatchEventTypeEnum } from '@match-events/models/match-event-type.enum';
import { MatchEventActions, MatchEventsState } from '@match-events/store';

@Component({
    selector: 'match-event-panel',
    templateUrl: './match-event-panel.component.html',
    styleUrls: ['./match-event-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchEventPanelComponent extends ObserverComponent {
    MatchEventType = MatchEventTypeEnum;

    @Input() isHome: boolean;
    @Input() matchId: boolean;

    @Select(AuthState.isInformer) isInformer$: Observable<boolean>;
    @Select(MatchEventsState.events) events$: Observable<MatchEvent[]>;
    @Select(MatchEventsState.editable) editable$: Observable<MatchEvent>;
    @Select(MatchEventsState.matchEventTypes) types$: Observable<MatchEventType[]>;

    constructor(private store: Store,
                private notifier: NotifierService) {
                    super();
    }

    public setEditing(editable: MatchEvent): void {
        this.store.dispatch(new MatchEventActions.StartEdit(editable));
    }

    public updateEvent(event: MatchEvent) {
        if (event.id) {
            this.store.dispatch(new MatchEventActions.Edit(event));
        } else {
            this.store.dispatch(new MatchEventActions.Add(event));
        }
        this.store.dispatch(new MatchEventActions.StartEdit(null));

    }

    public showDeleteModal(id: number): void {
        const sub$ = this.notifier.confirm(new ConfirmationMessage({
            title: 'Удалить ?'
        }))
        .subscribe(result => {
            if (result) {
                this.store.dispatch(new MatchEventActions.Remove(id))
            }
        });
        this.subscriptions.push(sub$);
    }
}
