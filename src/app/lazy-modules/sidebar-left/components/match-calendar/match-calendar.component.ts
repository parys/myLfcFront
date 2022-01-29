import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Match } from '@domain/models';

@Component({
    selector: 'match-calendar',
    templateUrl: './match-calendar.component.html',
    styleUrls: ['./match-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCalendarComponent {
    @Input() public last: Match;
    @Input() public next: Match;

    constructor() { }
}
