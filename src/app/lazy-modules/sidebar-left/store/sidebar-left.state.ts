import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { interval, of, Subscription } from 'rxjs';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';


import { NoticeMessage } from '@notices/shared';
import { ShowNotice } from '@notices/store';

import { SidebarLeftStateModel } from './sidebar-left.model';
import { MatchActions } from '../../../matches/store/matches.actions';

import { GetMatchesListQuery, GetMatchDetailQuery } from '@network/shared/matches';
import { MatchService } from '@matches/match.service';
import { isPlatformBrowser } from '@angular/common';
import { SignalRActions } from '@base/signalr/signalr.actions';
import { SidebarLeftService } from '../sidebar-left.service';
import { SidebarLeftActions } from './sidebar-left.actions';
import { MatchCalendar } from '@domain/models/match-calendar.model';


@State<SidebarLeftStateModel>({
    name: 'sidebarLeft',
     defaults: {
         nextMatch: null,
         lastMatch: null
 },
})
@Injectable()
export class SidebarLeftState {

    constructor(protected service: SidebarLeftService,
                private store: Store,
                @Inject(PLATFORM_ID) private platformId: object) { }


    @Selector()
    static nextMatch(state: SidebarLeftStateModel) {
        return state.nextMatch;
    }

    @Selector()
    static lastMatch(state: SidebarLeftStateModel) {
        return state.lastMatch;
    }


    // @Action(MatchActions.ChangeSort)
    // @Action(MatchActions.ChangePage)
    // @Action(MatchActions.SetMatchesFilterOptions)
    // onChangeSort({ patchState, getState, dispatch }: StateContext<SidebarLeftStateModel>, { payload }: MatchActions.ChangeSort) {
    //     const { request } = getState();
    //     patchState({ request: { ...request, ...payload } });
    //     dispatch(new MatchActions.GetMatchesList());
    // }

    // @Action(MatchActions.GetMatchesList)
    // onGetMatchesList(ctx: StateContext<SidebarLeftStateModel>) {
    //     const { request } = ctx.getState();
    //     return this.matchNetwork.getAll2(new GetMatchesListQuery.Request(request))
    //         .pipe(
    //             tap(response => {
    //                 ctx.patchState({ matches: response.results || [] });
    //                 ctx.patchState({
    //                     request: {
    //                         ...request, rowCount: response.rowCount,
    //                         currentPage: response.currentPage, pageSize: response.pageSize
    //                     }
    //                 });
    //             }));
    // }


    @Action(SidebarLeftActions.GetCalendar)
    onGetCalendar({ patchState }: StateContext<SidebarLeftStateModel>) {

        return this.service.getForCalendar()
            .pipe(
                tap((response: MatchCalendar) => {
                    patchState({ nextMatch: response.next, lastMatch: response.last });
                }),
            );

    }

    // @Action(MatchActions.GetMatchById)
    // onGetMatchById({ patchState, dispatch }: StateContext<SidebarLeftStateModel>, { payload }: MatchActions.GetMatchById) {
    //     return (payload.id ? this.matchNetwork.getSingle2(payload.id) : of(new GetMatchDetailQuery.Response()))
    //         .pipe(
    //             tap(match => {
    //                 patchState({ match });
    //                 if (match?.id) {
    //                     this.updateTitlesAndTags(match);
    //                     dispatch(new MatchActions.UpdateTimeRemaining(true));
    //                 }
    //             })
    //         );
    // }

    // @Action(MatchActions.ToggleHideTeams)
    // onToggleHideTeams({ patchState, getState }: StateContext<SidebarLeftStateModel>, { payload }: any) {
    //     return this.matchNetwork.toggleHideTeams(payload)
    //         .pipe(
    //             tap(response => {
    //                 const { match } = getState();
    //                 match.hideTeams = response.result;
    //                 patchState({ match });
    //             })
    //         );
    // }

    // @Action(MatchActions.UpdateTimeRemaining)
    // onUpdateTimeRemaining({ patchState, getState, dispatch }: StateContext<SidebarLeftStateModel>,
    //                       { payload }: MatchActions.UpdateTimeRemaining): void {

    //     if (isPlatformBrowser(this.platformId)) {
    //         const { match } = getState();

    //         MatchesState.COUNTDOWN$?.unsubscribe();
    //         if (payload) {
    //             MatchesState.COUNTDOWN$ = interval(1000).pipe(
    //                 map(() => this.updateTimeRemaining(match.dateTime)))
    //                 .subscribe(timeRemaining => patchState({ timeRemaining }));
    //         } else {
    //             patchState({ timeRemaining: null });
    //             patchState({match: { ...match, scoreHome: '0', scoreAway: '0' } } );
    //         //TODO call updateCalendar    dispatch(new Calendar)
    //         }
    //     }
    // }

    // @Action(SignalRActions.UpdateMatch)
    // onUpdateMatch({patchState, getState}: StateContext<SidebarLeftStateModel>, { payload }: SignalRActions.UpdateMatch) {
    //     const { match } = getState();
    //     if (match.id !== payload.entity.id) {
    //         return;
    //     }
    //     patchState({ match: payload.entity});
    //     this.updateTitlesAndTags(payload.entity);
    // }

    // @Action(SignalRActions.ToggleHideTeams)
    // onToggleHideTeamsSignalR({patchState, getState}: StateContext<SidebarLeftStateModel>, { payload }: SignalRActions.ToggleHideTeams) {
    //     const { match } = getState();

    //     if (match.id !== payload.matchId) {
    //         return;
    //     }
    //     match.hideTeams = payload.result;
    //     patchState({ match: {...match} });
    // }

    // private updateTimeRemaining(endtime: Date): string {
    //     const t = Date.parse(endtime.toString()) - Date.parse(new Date().toString());
    //     const seconds = Math.floor((t / 1000) % 60);
    //     const minutes = Math.floor((t / 1000 / 60) % 60);
    //     const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //     const days = Math.floor(t / (1000 * 60 * 60 * 24));
    //     if (t < 0) {
    //         MatchesState.COUNTDOWN$?.unsubscribe();
    //         this.store.dispatch(new MatchActions.UpdateTimeRemaining(false));
    //         return null;
    //     }
    //     return `${days}д:${hours}ч:${minutes}м:${seconds}с`;
    // }

    // private updateTitlesAndTags(match: GetMatchDetailQuery.Response) {
    //     const title = `${match.homeClubName} ${match.scoreHome
    //         ? match.scoreHome + '-' + match.scoreAway
    //         : '-'} ${match.awayClubName}`;
    //     this.titleService.setTitle(title);
    //     this.titleService.updateTypeMetaTag('sport');
    //     this.titleService.updateDescriptionMetaTag(`${title}. Результат матча Ливерпуля. Составы команд. События матча. Обсуждение матча.`);
    //     this.titleService.updateKeywordsMetaTag(
    //         `${title}, ${match.awayClubName}, ${match.homeClubName}, ${match.typeName}, ${match.stadiumName}, составы команд, события`
    //     );
    // }

}
