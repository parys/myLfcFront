import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import {
    GetHeaderMatch
} from './match-header.actions';
import { tap } from 'rxjs/operators';
import { MatchHeaderService } from '../match-header.service';
import { MatchHeaderStateModel } from './match-header-state.model';
import { SignalRActions } from '@base/signalr/signalr.actions';

@State<MatchHeaderStateModel>({
    name: 'matchHeader',
    defaults: {
        headerMatch: null,
    },
})
@Injectable()
export class MatchHeaderState {

    @Selector()
    static headerMatch(state: MatchHeaderStateModel) {
        return state.headerMatch;
    }

    constructor(private layoutService: MatchHeaderService) { }

    @Action(GetHeaderMatch)
    onGetHeaderMatch({ patchState }: StateContext<MatchHeaderStateModel>) {
        return this.layoutService.getHeaderMatch()
            .pipe(
                tap(match => {
                    patchState({ headerMatch: match });
                }));
    }

    @Action(SignalRActions.UpdateMatch)
    onUpdateMatch({patchState, getState}: StateContext<MatchHeaderStateModel>, { payload }: SignalRActions.UpdateMatch) {
        const { headerMatch } = getState();
        if (headerMatch.id !== payload.entity.id) {
            return;
        }
        patchState({ headerMatch: { ...payload.entity, commentCount: headerMatch.commentCount} });
    }
}
