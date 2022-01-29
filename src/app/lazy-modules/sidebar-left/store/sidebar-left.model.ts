import { GetMatchesListQuery, GetMatchDetailQuery } from '@network/shared/matches';
import { Match, MatchType } from '@domain/models';

export interface SidebarLeftStateModel {
    lastMatch: Match;
    nextMatch: Match;
}
