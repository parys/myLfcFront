import { Injectable } from '@angular/core';

import { State, Selector, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PersonEditStateModel } from './person-edit-state.model';
import { PersonEditActions } from './person-edit.actions';
import { PersonEditService } from '../person-edit.service';


@State<PersonEditStateModel>({
    name: 'personEdit',
    defaults: {
        types: [],
        person: null
    },
})
@Injectable()
export class PersonEditState {

    @Selector()
    static types(state: PersonEditStateModel) {
        return state.types;
    }

    constructor(protected network: PersonEditService) { }

    @Action(PersonEditActions.GetTypes)
    onGetOtherMaterialsList({ getState, patchState }: StateContext<PersonEditStateModel>) {
        const { types } = getState();

        if (types.length === 0) {
            return this.network.getTypes()
                .pipe(
                    tap(response => {
                        patchState({ types: response || [] });
                    }));
        } else {
            return of(true);
        }
    }

}
