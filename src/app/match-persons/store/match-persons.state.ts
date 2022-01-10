import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import cloneDeep from 'lodash/cloneDeep';

import { MatchPersonsStateModel } from './match-persons.model';
import { MatchPersonActions } from './match-persons.actions';

import { MatchPersonService } from '@match-persons/match-person.service';
import { SignalRActions } from '@base/signalr/signalr.actions';
import { MatchesState } from '@matches/store';
import { SignalREntityEnum } from '@base/signalr/models';
import { GetMatchPersonsListQuery } from '@network/shared/match-persons/get-match-persons-list.query';


@State<MatchPersonsStateModel>({
    name: 'matchPersons',
    defaults: {
        matchPersonTypes: [],
        flatMatchPersons: [],
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
    static flatMatchPersons(state: MatchPersonsStateModel) {
        return state.flatMatchPersons;
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
                    patchState({ matchPersons: response.results || [], flatMatchPersons: response.flatListResults });
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

        const { editOptions, selected } = getState();

        if (editOptions) {
            editOptions.currentCount++;
        }
        if (!payload.order) {
            payload.order = editOptions?.currentCount;
        }
        return this.matchPersonNetwork.createOrUpdate(payload)
        .pipe(
            tap(response => {

                if (editOptions) {
                    if (this.checkExit(editOptions.neededCount, editOptions.currentCount)) {
                        patchState({ editOptions: null});
                    } else {
                        patchState({ editOptions: {...editOptions }});
                    }
                    patchState({ selected: { ...selected, id: null, personId: null, personName: null } });
                }
        }));
    }

    @Action(MatchPersonActions.Delete)
    onDelete({patchState, getState }: StateContext<MatchPersonsStateModel>, { payload }: MatchPersonActions.Delete) {

        return this.matchPersonNetwork.delete(payload.matchId, payload.personId)
        .pipe(tap(response => {
            // notify about delete
        }));
    }

    @Action(SignalRActions.UpdateMP)
    onUpdateMP({ getState, patchState }: StateContext<MatchPersonsStateModel>, { payload }: SignalRActions.UpdateMP) {

        const match = this.store.selectSnapshot(MatchesState.match);
        if (match.id !== payload.entity.matchId) {
            return;
        }
        const { matchPersons } = getState();
        let { flatMatchPersons } = getState();
        switch (payload.type) {
            case SignalREntityEnum.Add: {
                matchPersons[payload.entity.placeType].push(payload.entity);
                matchPersons[payload.entity.placeType] = matchPersons[payload.entity.placeType].sort(compare);
                patchState({ matchPersons: cloneDeep(matchPersons) });

                flatMatchPersons.push(payload.entity);
                patchState({ flatMatchPersons: cloneDeep(flatMatchPersons) });

                break;
            }
            case SignalREntityEnum.Update: {
                const index = matchPersons[payload.entity.placeType].findIndex(x => x.personId === payload.entity.personId);
                if (index > -1) {
                    matchPersons[payload.entity.placeType][index] = payload.entity;
                    matchPersons[payload.entity.placeType] = matchPersons[payload.entity.placeType].sort(compare);
                    patchState({ matchPersons: cloneDeep(matchPersons) });
                }

                break;
            }
            case SignalREntityEnum.Delete: {
                const index = matchPersons[payload.entity.placeType].findIndex(x => x.personId === payload.entity.personId);
                if (index > -1) {
                    matchPersons[payload.entity.placeType].splice(index, 1);
                    patchState({ matchPersons: cloneDeep(matchPersons) });
                }

                flatMatchPersons = flatMatchPersons.filter(x => x.id === payload.entity.id);
                patchState({ flatMatchPersons: cloneDeep(flatMatchPersons) });

                break;
            }
        }
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

function compare(a: GetMatchPersonsListQuery.MatchPersonListDto, b: GetMatchPersonsListQuery.MatchPersonListDto) {
    return a.order - b.order;
    // var x = a.order;
    // var y = b.order;
    // return x < y ? -1 : x > y ? 1 : 0;
}
