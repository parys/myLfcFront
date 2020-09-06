import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import { MatchEventsStateModel } from './match-events.model';
import { MatchEventActions } from './match-events.actions';
import { MatchEventService } from '@match-events/matchEvent.service';

@State<MatchEventsStateModel>({
    name: 'matchEvents',
    defaults: {
        matchEventTypes: [],
        matchEvents: [],
    },
})

@Injectable()
export class MatchEventsState {

    @Selector()
    static matchEventTypes(state: MatchEventsStateModel) {
        return state.matchEventTypes;
    }

    @Selector()
    static matchEvents(state: MatchEventsStateModel) {
        return state.matchEvents;
    }

    constructor(private store: Store, protected matchEventsNetwork: MatchEventService) { }

    @Action(MatchEventActions.GetMatchEventsList)
    onGetMatchEventsList({ patchState }: StateContext<MatchEventsStateModel>, { payload }: MatchEventActions.GetMatchEventsList) {

        return this.matchEventsNetwork.getMatchEvents(payload)
            .pipe(
                tap(response => {
                //    patchState({ matchEvents: response.results || [] });
                }));
    }


    @Action(MatchEventActions.GetMatchEventTypesList)
    onGetMatchPersonTypesList({ patchState, getState }: StateContext<MatchEventsStateModel>) {
        const { matchEventTypes } = getState();
        if (matchEventTypes.length === 0) {
            return this.matchEventsNetwork.getTypes()
                .pipe(
                    tap(response => { patchState({ matchEventTypes: response || [] }); }),
                );
        }
    }

    // @Action(Actions.UpdateMatchPerson)
    // onUpdateMatchPerson({ patchState, getState }: StateContext<MatchEventsStateModel>, { payload }: Actions.UpdateMatchPerson) {
    //     const { editOptions } = getState();
    //     return this.matchPersonNetwork.createOrUpdate(payload)
    //     .pipe(
    //         tap(response => {
    //             editOptions.currentCount++;
    //             if (this.checkExit(editOptions.neededCount, editOptions.currentCount)) {
    //                 patchState({ editOptions: null});
    //             } else {
    //                 editOptions.selected = null;
    //                 patchState({ editOptions: {...editOptions}});
    //             }
    //     }));
    // }

    // @Action(Actions.DeleteMatchPerson)
    // onDeleteMatchPerson({patchState, getState }: StateContext<MatchEventsStateModel>, { payload }: Actions.DeleteMatchPerson) {
    //     const { matchPersons } = getState();
    //     return this.matchPersonNetwork.delete(payload.matchId, payload.personId)
    //     .pipe(tap(response => {
    //         matchPersons[payload.personType] = matchPersons[payload.personType].filter(x => x.personId !== payload.personId);
    //         patchState({ matchPersons: {...matchPersons} });
    //     }));
    // }

    // @Action(Actions.PushMatchPerson)
    // onPushMatchPerson({ patchState, getState }: StateContext<MatchPersonsStateModel>, { payload }: Actions.PushMatchPerson) {
    //     const { matchPersons } = getState();

    //     matchPersons[payload.type].push(payload);

    //     patchState({ matchPersons});
    // }

    // @Action(Actions.SetEditOptions)
    // onSetEditOptions({ patchState }: StateContext<MatchPersonsStateModel>, { payload }: Actions.SetEditOptions) {
    //     this.store.dispatch(new Actions.GetMatchPersonTypesList());
    //     patchState({ editOptions: {selected: null, ...payload} });
    // }

    // @Action(Actions.SetSelectedPerson)
    // onSetSelectedPerson({ patchState }: StateContext<MatchPersonsStateModel>, { payload }: Actions.SetSelectedPerson) {
    //     this.store.dispatch(new Actions.GetMatchPersonTypesList());
    //     patchState({ editOptions: {selected: payload, mpType: null, currentCount: 0, neededCount: 0, personTypeId: null } });
    // }

    // @Action(Actions.CancelEdit)
    // onCancelEdit({ patchState }: StateContext<MatchPersonsStateModel>) {
    //     patchState({ editOptions: null });
    // }

    private checkExit(neededCount: number, currentCount: number): boolean {
        return currentCount === neededCount && neededCount !== 0;
    }
}
