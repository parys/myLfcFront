import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { interval, of, Subscription } from 'rxjs';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';


import { NoticeMessage } from '@notices/shared';
import { ShowNotice } from '@notices/store';

import { MatchesStateModel } from './matches.model';
import { MatchActions } from './matches.actions';

import { GetMatchesListQuery, GetMatchDetailQuery } from '@network/shared/matches';
import { MatchService } from '@matches/match.service';
import { CustomTitleMetaService } from '@core/services';
import { isPlatformBrowser } from '@angular/common';
import { SignalRActions } from '@base/signalr/signalr.actions';


@State<MatchesStateModel>({
    name: 'matches',
    defaults: {
        matches: [],
        match: null,
        request: new GetMatchesListQuery.Request({ currentPage: 1, pageSize: 15, sortDirection: 'desc', sortOn: 'lastModified' }),
        matchTypes: [],
        timeRemaining: null,
    },
})
@Injectable()
export class MatchesState {

    constructor(protected matchNetwork: MatchService,
                private store: Store,
                @Inject(PLATFORM_ID) private platformId: object,
                protected titleService: CustomTitleMetaService) { }


    private static COUNTDOWN$: Subscription;

    @Selector()
    static match(state: MatchesStateModel) {
        return state.match;
    }

    @Selector()
    static matches(state: MatchesStateModel) {
        return state.matches;
    }

    @Selector()
    static matchTypes(state: MatchesStateModel) {
        return state.matchTypes;
    }

    @Selector()
    static request(state: MatchesStateModel) {
        return state.request;
    }

    @Selector()
    static timeRemaining(state: MatchesStateModel) {
        return state.timeRemaining;
    }

    @Action(MatchActions.ChangeSort)
    @Action(MatchActions.ChangePage)
    @Action(MatchActions.SetMatchesFilterOptions)
    onChangeSort({ patchState, getState, dispatch }: StateContext<MatchesStateModel>, { payload }: MatchActions.ChangeSort) {
        const { request } = getState();
        patchState({ request: { ...request, ...payload } });
        dispatch(new MatchActions.GetMatchesList());
    }

    @Action(MatchActions.GetMatchesList)
    onGetMatchesList(ctx: StateContext<MatchesStateModel>) {
        const { request } = ctx.getState();
        return this.matchNetwork.getAll2(new GetMatchesListQuery.Request(request))
            .pipe(
                tap(response => {
                    ctx.patchState({ matches: response.results || [] });
                    ctx.patchState({
                        request: {
                            ...request, rowCount: response.rowCount,
                            currentPage: response.currentPage, pageSize: response.pageSize
                        }
                    });
                }));
    }


    @Action(MatchActions.GetMatchTypesList)
    onGetMatchTypesList({ patchState, getState }: StateContext<MatchesStateModel>) {
        const { matchTypes } = getState();
        if (matchTypes.length === 0) {
            return this.matchNetwork.getTypes()
                .pipe(
                    tap(response => { patchState({ matchTypes: response || [] }); }),
                );
        }
    }

    @Action(MatchActions.GetMatchById)
    onGetMatchById({ patchState, dispatch }: StateContext<MatchesStateModel>, { payload }: MatchActions.GetMatchById) {
        return (payload.id ? this.matchNetwork.getSingle2(payload.id) : of(new GetMatchDetailQuery.Response()))
            .pipe(
                tap(match => {
                    patchState({ match });
                    if (match?.id) {
                        this.updateTitlesAndTags(match);
                        dispatch(new MatchActions.UpdateTimeRemaining(true));
                    }
                })
            );
    }

    @Action(MatchActions.ToggleHideTeams)
    onToggleHideTeams({ patchState, getState }: StateContext<MatchesStateModel>, { payload }: any) {
        return this.matchNetwork.toggleHideTeams(payload)
            .pipe(
                tap(response => {
                    const { match } = getState();
                    match.hideTeams = response.result;
                    patchState({ match });
                })
            );
    }

    @Action(MatchActions.UpdateTimeRemaining)
    onUpdateTimeRemaining({patchState, getState}: StateContext<MatchesStateModel>, { payload }: MatchActions.UpdateTimeRemaining ) {

        if (isPlatformBrowser(this.platformId)) {
            const { match } = getState();

            MatchesState.COUNTDOWN$?.unsubscribe();
            if (payload) {
                MatchesState.COUNTDOWN$ = interval(1000).pipe(
                    map(() => this.updateTimeRemaining(match.dateTime)))
                    .subscribe(timeRemaining => patchState({ timeRemaining }));
            } else {
                patchState({ timeRemaining: null });
                patchState({match: { ...match, scoreHome: '0', scoreAway: '0' } } );
            }
        }
    }

    @Action(SignalRActions.UpdateMatch)
    onUpdateMatch({patchState, getState}: StateContext<MatchesStateModel>, { payload }: SignalRActions.UpdateMatch) {
        const { match } = getState();
        if (match.id !== payload.entity.id) {
            return;
        }
        patchState({ match: payload.entity});
        this.updateTitlesAndTags(payload.entity);
    }

    @Action(SignalRActions.ToggleHideTeams)
    onToggleHideTeamsSignalR({patchState, getState}: StateContext<MatchesStateModel>, { payload }: SignalRActions.ToggleHideTeams) {
        const { match } = getState();

        if (match.id !== payload.matchId) {
            return;
        }
        match.hideTeams = payload.result;
        patchState({ match: {...match} });
    }

    private updateTimeRemaining(endtime: Date): string {
        const t = Date.parse(endtime.toString()) - Date.parse(new Date().toString());
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        if (t < 0) {
            MatchesState.COUNTDOWN$?.unsubscribe();
            this.store.dispatch(new MatchActions.UpdateTimeRemaining(false));
            return null;
        }
        return `${days}д:${hours}ч:${minutes}м:${seconds}с`;
    }

    private updateTitlesAndTags(match: GetMatchDetailQuery.Response) {
        const title = `${match.homeClubName} ${match.scoreHome
            ? match.scoreHome + '-' + match.scoreAway
            : '-'} ${match.awayClubName}`;
        this.titleService.setTitle(title);
        this.titleService.updateTypeMetaTag('sport');
        this.titleService.updateDescriptionMetaTag(`${title}. Результат матча Ливерпуля. Составы команд. События матча. Обсуждение матча.`);
        this.titleService.updateKeywordsMetaTag(
            `${title}, ${match.awayClubName}, ${match.homeClubName}, ${match.typeName}, ${match.stadiumName}, составы команд, события`
        );
    }

}
