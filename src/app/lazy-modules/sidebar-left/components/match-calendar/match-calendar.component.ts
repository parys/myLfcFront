import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { Match, MatchCalendar } from '@domain/models';
import { SidebarLeftService } from '@lazy-modules/sidebar-left/sidebar-left.service';

@Component({
    selector: 'match-calendar',
    templateUrl: './match-calendar.component.html',
    styleUrls: ['./match-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCalendarComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public last: Match;
    public next: Match;

    constructor(private service: SidebarLeftService,
                private cd: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.sub = this.service.getForCalendar().subscribe(data => {
            this.parse(data);
        });
    }
    private parse(matches: MatchCalendar): void {
        this.last = matches.last;
        this.next = matches.next;
        this.cd.markForCheck();
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }
}
