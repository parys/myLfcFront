import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import {
    GetHeaderMatch
} from './match-header.actions';
import { tap } from 'rxjs/operators';
import { MatchHeaderService } from '../match-header.service';
import { MatchHeaderStateModel } from './match-header-state.model';

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
}
