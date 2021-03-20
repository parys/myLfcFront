import { Injectable } from '@angular/core';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { CoreStateModel } from '@core/store/core-state.model';
import { ChangeMobile, CoreActions } from '@core/store/core.actions';

@State<CoreStateModel>({
    name: 'core',
    defaults: {
        mobile: true,
        menuOpened: false
    },
})
@Injectable()
export class CoreState {

    @Selector()
    static mobile(state: CoreStateModel) {
        return state.mobile;
    }

    @Selector()
    static menuOpened(state: CoreStateModel) {
        return state.menuOpened;
    }

    constructor() { }

    @Action(ChangeMobile)
    onChangeMobile({ patchState }: StateContext<CoreStateModel>, { payload }: ChangeMobile) {
        patchState({ mobile: payload });
    }

    @Action(CoreActions.ToggleMenu)
    onToggleMenu({ patchState }: StateContext<CoreStateModel>) {
        patchState({ menuOpened: true });
    }

    @Action(CoreActions.CloseMenu)
    onCloseMenu({ patchState }: StateContext<CoreStateModel>) {
        patchState({ menuOpened: false });
    }
}
