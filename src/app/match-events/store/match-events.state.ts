import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import cloneDeep from 'lodash/cloneDeep';

import { MatchEventsStateModel } from './match-events.model';
import { MatchEventActions } from './match-events.actions';
import { MatchEventService } from '@match-events/matchEvent.service';
import { ShowNotice } from '@notices/store';
import { NoticeMessage } from '@notices/shared';
import { SignalREntityEnum } from '@base/signalr/models';
import { patch, removeItem } from '@ngxs/store/operators';
import { MatchEvent } from '@domain/models';
import { MatchesState } from '@matches/store';
import { SignalRActions } from '@base/signalr/signalr.actions';

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

    constructor(protected store: Store, protected matchEventsNetwork: MatchEventService) {        
            
    }

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
        const match = this.store.selectSnapshot(MatchesState.match);    
        payload.matchId = match.id;   
        payload.seasonId = match.seasonId;   
        return this.matchEventsNetwork.update(payload.id, payload)
            .pipe(            
                tap(response => dispatch(new ShowNotice(NoticeMessage.success('Обновление события', 'Событие обновлено.')) ))
            );
    }
        
    @Action(SignalRActions.UpdateME)
    onUpdate({ getState, setState, patchState }: StateContext<MatchEventsStateModel>, { payload }: SignalRActions.UpdateME) {              
        if (payload.type != SignalREntityEnum.Delete) {
            const match = this.store.selectSnapshot(MatchesState.match);
            if (match.id !== payload.entity.matchId) {
                return;
            }
        }
        let { matchEvents } = getState();
        switch (payload.type) {
            case SignalREntityEnum.Add: {
                matchEvents.push(payload.entity);
                matchEvents = matchEvents.sort((a, b) => a.minute-b.minute);
                patchState({ matchEvents: cloneDeep(matchEvents) });
                break;
            }
            case SignalREntityEnum.Update: {
                const index = matchEvents.findIndex(x => x.id === payload.entity.id);
                if (index > -1) {
                    matchEvents[index] = payload.entity;                
                    matchEvents = matchEvents.sort((a, b) => a.minute-b.minute);
                    patchState({ matchEvents: cloneDeep(matchEvents) });
                }
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
