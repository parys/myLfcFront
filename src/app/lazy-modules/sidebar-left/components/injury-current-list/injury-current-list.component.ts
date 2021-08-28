import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { SidebarLeftService } from '@lazy-modules/sidebar-left/sidebar-left.service';
import { Select } from '@ngxs/store';
import { AuthState } from '@auth/store';
import { Injury } from '@injuries/models/injury.model';

@Component({
    selector: 'injury-current-list',
    templateUrl: './injury-current-list.component.html',
    styleUrls: ['./injury-current-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjuryCurrentListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public items: Injury[];

    @Select(AuthState.isAdminAssistant) isAdminAssistant$: Observable<boolean>;

    constructor(private service: SidebarLeftService,
                private cd: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
            this.sub = this.service.getCurrentInjuries().subscribe(data => {
                    this.items = data;
                },
                null,
                () => {
                    this.cd.markForCheck();
                });
        
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }
}
