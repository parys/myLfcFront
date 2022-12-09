import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import {
    NewPm,
    ReadPms,
    NewNotification,
    ReadNotifications
} from '@core/store/core.actions';
import {
    GetUnreadNotificationsCount,
    GetUnreadPmsCount,
} from './counters.actions';
import { CustomTitleMetaService } from '@core/services';
import { ProfileCountersService } from '../services/profile-counters.service';
import { CountersStateModel } from './counters-state.model';

@State<CountersStateModel>({
    name: 'counters',
    defaults: {
        notificationsCount: 0,
        pmsCount: 0,
        inited: false
    },
})
@Injectable()
export class CountersState {

    @Selector()
    static notificationsCount(state: CountersStateModel) {
        return state.notificationsCount;
    }

    @Selector()
    static pmsCount(state: CountersStateModel) {
        return state.pmsCount;
    }

    constructor(private layoutService: ProfileCountersService,
                private titleService: CustomTitleMetaService,
                private router: Router,
                private snackBar: MatSnackBar) { }

    @Action(GetUnreadNotificationsCount)
    onGetUnreadNotificationsCount({ patchState, getState }: StateContext<CountersStateModel>) {
        const { inited } = getState();
        if (inited) {
            return;
        }
        return this.layoutService.getUnreadNotificationsCount()
            .pipe(tap(count => {
                patchState({ notificationsCount: count });
                if (count > 0) {
                    this.titleService.addCount(count);
                    this.snackBar.open('Есть новые уведомления', 'Перейти')
                        .onAction()
                        .subscribe(_ => this.router.navigate(['notifications']));
                }
            }));
    }

    @Action(NewPm)
    onNewPm({ patchState, getState }: StateContext<CountersStateModel>, { payload }: NewPm) {
        let { pmsCount } = getState();
        patchState({ pmsCount: ++pmsCount });
        this.titleService.addCount(1);
        return this.snackBar.open('Новое сообщение', 'Перейти')
            .onAction()
            .subscribe(_ => this.router.navigate(['pms', payload.id]));
    }

    @Action(ReadPms)
    onReadPms({ patchState, getState }: StateContext<CountersStateModel>) {
        let { pmsCount } = getState();
        patchState({ pmsCount: --pmsCount });
        this.titleService.removeCount(1);
    }

    @Action(GetUnreadPmsCount)
    onGetUnreadPmsCount({ patchState, getState }: StateContext<CountersStateModel>) {
        const { inited } = getState();
        if (inited) {
            return;
        }
        return this.layoutService.getUnreadPmsCount()
            .pipe(
                tap(count => {
                    patchState({ pmsCount: count, inited: true });
                    if (count > 0) {
                        this.titleService.addCount(count);
                        this.snackBar
                            .open('Есть новые сообщения', 'Перейти')
                            .onAction()
                            .subscribe(() => this.router.navigate(['pms']));
                    }
                }));
    }

    @Action(NewNotification)
    onNewNotification({ patchState, getState }: StateContext<CountersStateModel>, { payload }: NewNotification) {
        let { notificationsCount } = getState();
        patchState({ notificationsCount: ++notificationsCount });
        this.titleService.addCount(1);
        return this.snackBar.open('Новое уведомление', 'Перейти')
            .onAction()
            .subscribe(_ => {
                this.layoutService.read([payload.id])
                    .pipe(tap(_ => this.router.navigate([`/${payload.typeName}/${payload.entityId}`], { fragment: payload.commentId ? `com${payload.commentId}` : '' })));
            }
            );
    }

    @Action(ReadNotifications)
    onReadNotifications({ patchState, getState }: StateContext<CountersStateModel>, { payload }: ReadNotifications) {
        let { notificationsCount } = getState();
        notificationsCount -= payload;
        patchState({ notificationsCount });
        this.titleService.removeCount(payload);
    }
}
