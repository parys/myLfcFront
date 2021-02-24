import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { AuthState } from '@auth/store';
import { MatchesState } from '@matches/store';
import { GetMatchDetailQuery } from '@network/shared/matches';

import { MatchService } from '@matches/match.service';

@Component({
    selector: 'match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchDetailComponent {

    @Select(AuthState.isInformer) isInformer$: Observable<boolean>;
    @Select(MatchesState.match) match$: Observable<GetMatchDetailQuery.Response>;
    @Select(MatchesState.timeRemaining) timeRemaining$: Observable<string>;

    constructor(private matchService: MatchService) {
    }
    public pin(id?: number): void {
        this.matchService.pin(id).subscribe((data: boolean) => data);
    }
}
