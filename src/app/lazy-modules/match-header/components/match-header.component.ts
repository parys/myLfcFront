﻿import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { Match } from '@domain/models/match.model';
import { MatchHeaderState, GetHeaderMatch } from '../store';

@Component({
    selector: 'match-header',
    templateUrl: './match-header.component.html',
    styleUrls: ['./match-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatchHeaderComponent {

    @Select(MatchHeaderState.headerMatch) headerMatch$: Observable<Match>;

    constructor(private store: Store) {
        this.store.dispatch(new GetHeaderMatch());
    }
}
