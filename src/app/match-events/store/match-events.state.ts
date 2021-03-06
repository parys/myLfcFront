import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';

import { MatchEventsStateModel } from './match-events.model';
import { MatchEventActions } from './match-events.actions';
import { MatchEventService } from '@match-events/matchEvent.service';
import { ShowNotice } from '@notices/store';
import { NoticeMessage } from '@notices/shared';
import { SignalREntityEnum } from '@base/signalr/models';
import { patch, removeItem, updateItem } from '@ngxs/store/operators';
import { appendToStartOrUpdate } from '@domain/operators/append-to-start-or-append';
import { MatchEvent } from '@domain/models';
import { MatchesState } from '@matches/store';

@State<MatchEventsStateModel>({
    name: 'matchEvents',
    defaults: {
        matchEventTypes: [],
        matchEvents: [],
        editable: null,
    },
})

@Injectable()
export class MatchEventsState {

    @Selector()
    static matchEventTypes(state: MatchEventsStateModel) {
        return state.matchEventTypes;
    }

    @Selector()
    static events(state: MatchEventsStateModel) {
        return state.matchEvents;
    }

    @Selector()
    static editable(state: MatchEventsStateModel) {
        return state.editable;
    }

    constructor(protected store: Store, protected matchEventsNetwork: MatchEventService) { }

    @Action(MatchEventActions.GetList)
    onGetList({ patchState }: StateContext<MatchEventsStateModel>, { payload }: MatchEventActions.GetList) {

        return this.matchEventsNetwork.getMatchEvents(payload)
            .pipe(
                tap(response => {
                    patchState({ matchEvents: response || [] });
                }));
    }


    @Action(MatchEventActions.GetTypesList)
    onGetTypesList({ patchState, getState }: StateContext<MatchEventsStateModel>) {
        const { matchEventTypes } = getState();
        if (matchEventTypes.length === 0) {
            return this.matchEventsNetwork.getTypes()
                .pipe(
                    tap(response => { patchState({ matchEventTypes: response || [] }); }),
                );
        }
    }

    
    @Action(MatchEventActions.Remove)
    onRemove({ dispatch }: StateContext<MatchEventsStateModel>, { payload }: MatchEventActions.Remove) {        
        return this.matchEventsNetwork.delete(payload)
            .pipe(            
                tap(response => dispatch(new ShowNotice(NoticeMessage.success('Удаление события', 'Событие удалено.')) ))
            );
    }
    
    @Action(MatchEventActions.Add)
    onAdd({ dispatch }: StateContext<MatchEventsStateModel>, { payload }: MatchEventActions.Add) { 
        const match  = this.store.selectSnapshot(MatchesState.match);    
        payload.matchId = match.id;   
        payload.seasonId = match.seasonId;   
        return this.matchEventsNetwork.create(payload)
            .pipe(            
                tap(response => dispatch(new ShowNotice(NoticeMessage.success('Создание события', 'Событие создано.')) ))
            );
    }

    @Action(MatchEventActions.Edit)
    onEdit({ dispatch }: StateContext<MatchEventsStateModel>, { payload }: MatchEventActions.Edit) { 
        const match  = this.store.selectSnapshot(MatchesState.match);    
        payload.matchId = match.id;   
        payload.seasonId = match.seasonId;   
        return this.matchEventsNetwork.update(payload.id, payload)
            .pipe(            
                tap(response => dispatch(new ShowNotice(NoticeMessage.success('Обновление события', 'Событие обновлено.')) ))
            );
    }
    
    
    @Action(MatchEventActions.Update)
    onUpdate({ getState, patchState, setState }: StateContext<MatchEventsStateModel>, { payload }: MatchEventActions.Update) {        
        //ignore if not same match        
        switch (payload.type) {
            case SignalREntityEnum.Add: {
                setState(patch({ matchEvents: appendToStartOrUpdate(payload.entity, x => x.id === payload.entity.id, true)}));
                break;
            }
            case SignalREntityEnum.Update: {                
                setState(patch({ matchEvents: updateItem(x => x.id === payload.entity.id, payload.entity)}));
                break;
            }
            case SignalREntityEnum.Delete: {
                setState(patch({ matchEvents: removeItem<MatchEvent>(x => x.id === payload.entity.id)}));
                break;
            }
        }
    }

    @Action(MatchEventActions.StartEdit)
    onStartEdit({ patchState, dispatch }: StateContext<MatchEventsStateModel>, {payload}: MatchEventActions.StartEdit) {
        
        dispatch(new MatchEventActions.GetTypesList());
        patchState({ editable: payload });
    }
}
