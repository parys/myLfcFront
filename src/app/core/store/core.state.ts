import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { CoreStateModel } from '@core/store/core-state.model';
import { ChangeMobile } from '@core/store/core.actions';

@State<CoreStateModel>({
    name: 'core',
    defaults: {
        mobile: null
    },
})
@Injectable()
export class CoreState {

    @Selector()
    static mobile(state: CoreStateModel) {
        return state.mobile;
    }

    constructor() { }

    @Action(ChangeMobile)
    onChangeMobile({ patchState }: StateContext<CoreStateModel>, { payload }: ChangeMobile) {
        patchState({ mobile: payload });
    }
}
