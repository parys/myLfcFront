import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { CoreStateModel } from '@core/store/core-state.model';
import { CoreActios } from '@core/store/core.actions';

@State<CoreStateModel>({
    name: 'core',
    defaults: {
        mobile: true,
        signalr: false,
    },
})
@Injectable()
export class CoreState {

    @Selector()
    static mobile(state: CoreStateModel) {
        return state.mobile;
    }

    @Selector()
    static signalr(state: CoreStateModel) {
        return state.signalr;
    }

    constructor() { }

    @Action(CoreActios.ChangeMobile)
    onChangeMobile({ patchState }: StateContext<CoreStateModel>, { payload }: CoreActios.ChangeMobile) {
        patchState({ mobile: payload });
    }

    @Action(CoreActios.ChangeSignalr)
    onChangeSignalr({ patchState }: StateContext<CoreStateModel>, { payload }: CoreActios.ChangeSignalr) {
        patchState({ signalr: payload });
    }
}
