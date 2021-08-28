import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { AuthState } from '@auth/store';
import { SidebarLeftService } from '@lazy-modules/sidebar-left/sidebar-left.service';
import { HelperType } from '@domain/enums/helper-type.enum';

@Component({
    selector: 'cup-table',
    templateUrl: './cupTable.component.html',
    styleUrls: ['./cupTable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CupTableComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public cupTable: string;

    @Select(AuthState.isInformer) isInformer$: Observable<boolean>;

    constructor(private service: SidebarLeftService,
                private cd: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.sub = this.service
            .getValue(HelperType.CupTable)
            .subscribe(data => {
                this.parse(data);
            });
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }

    private parse(data: string): void {
        this.cupTable = data;
        this.cd.markForCheck();
    }
}
