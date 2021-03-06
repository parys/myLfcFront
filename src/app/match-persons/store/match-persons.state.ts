import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import { MatchPersonsStateModel } from './match-persons.model';
import { MatchPersonActions } from './match-persons.actions';

import { MatchPersonService } from '@match-persons/match-person.service';


@State<MatchPersonsStateModel>({
    name: 'matchPersons',
    defaults: {
        matchPersonTypes: [],
        matchPersons: null,
        editOptions: null,
        selected: null,
    },
})
@Injectable()
export class MatchPersonsState {

    @Selector()
    static matchPersonTypes(state: MatchPersonsStateModel) {
        return state.matchPersonTypes;
    }

    @Selector()
    static matchPersons(state: MatchPersonsStateModel) {
        return state.matchPersons;
    }

    @Selector()
    static editOptions(state: MatchPersonsStateModel) {
        return state.editOptions;
    }

    @Selector()
    static selected(state: MatchPersonsStateModel) {
        return state.selected;
    }

    constructor(private store: Store, protected matchPersonNetwork: MatchPersonService) { }

    @Action(MatchPersonActions.GetList)
    onGetList({ patchState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.GetList) {

        return this.matchPersonNetwork.getMatchPersons(payload)
            .pipe(
                tap(response => {
                    patchState({ matchPersons: response.results || [] });
                }));
    }


    @Action(MatchPersonActions.GetTypesList)
    onGetTypesList({ patchState, getState }: StateContext<MatchPersonsStateModel>) {
        const { matchPersonTypes } = getState();
        if (matchPersonTypes.length === 0) {
            return this.matchPersonNetwork.getTypes()
                .pipe(
                    tap(response => { patchState({ matchPersonTypes: response || [] }); }),
                );
        }
    }

    @Action(MatchPersonActions.AddEdit)
    onAddEdit({ patchState, getState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.AddEdit) {
        const { editOptions } = getState();
        return this.matchPersonNetwork.createOrUpdate(payload)
        .pipe(
            tap(response => {
                editOptions.currentCount++;
                if (this.checkExit(editOptions.neededCount, editOptions.currentCount)) {
                    patchState({ editOptions: null});
                } else {
                    patchState({ editOptions: {...editOptions }, selected: null});
                }
        }));
    }

    @Action(MatchPersonActions.Delete)
    onDelete({patchState, getState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.Delete) {
        const { matchPersons } = getState();
        return this.matchPersonNetwork.delete(payload.matchId, payload.personId)
        .pipe(tap(response => {
            matchPersons[payload.personType] = matchPersons[payload.personType].filter(x => x.personId !== payload.personId);
            patchState({ matchPersons: {...matchPersons} });
        }));
    }

    @Action(MatchPersonActions.PushMatchPerson)
    onPushMatchPerson({ patchState, getState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.PushMatchPerson) {
        const { matchPersons } = getState();

        matchPersons[payload.type].push(payload);

        patchState({ matchPersons});
    }

    @Action(MatchPersonActions.SetEditOptions)
    onSetEditOptions({ patchState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.SetEditOptions) {
        this.store.dispatch(new MatchPersonActions.GetTypesList());
        patchState({ editOptions: payload, selected: null });
    }

    @Action(MatchPersonActions.SetSelectedPerson)
    onSetSelectedPerson({ patchState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.SetSelectedPerson) {
        this.store.dispatch(new MatchPersonActions.GetTypesList());
        patchState({ editOptions: { mpType: null, currentCount: 0, neededCount: 0, personTypeId: null }, selected: payload });
    }

    @Action(MatchPersonActions.CancelEdit)
    onCancelEdit({ patchState }: StateContext<MatchPersonsStateModel>) {
        patchState({ editOptions: null });
    }

    private checkExit(neededCount: number, currentCount: number): boolean {
        return currentCount === neededCount && neededCount !== 0;
    }
}
