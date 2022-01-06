import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

import { Material, PagedList } from '@domain/models';
import { CustomTitleMetaService } from '@core/services';
import { TITLE_RU } from '@constants/ru.constants';

import { MaterialCoreService } from '@materials/core/material-core.service';
@Component({
    selector: 'material-home',
    templateUrl: './material-home.component.html',
    styleUrls: ['./material-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialHomeComponent implements OnInit, OnDestroy {
    private $latest: Subscription;
    private $pinned: Subscription;
    private navigationSubscription: Subscription;
    public latest: Material[];
    public pinned: Material[];

    constructor(
                private router: Router,
                private materialService: MaterialCoreService,
                private cd: ChangeDetectorRef,
                private titleService: CustomTitleMetaService) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.update();
            }
        });
    }

    public ngOnInit(): void {
        this.titleService.setTitle(TITLE_RU);
        this.update();
    }

    public ngOnDestroy(): void {
        if (this.$latest) { this.$latest.unsubscribe(); }
        if (this.$pinned) { this.$pinned.unsubscribe(); }
        if (this.navigationSubscription) { this.navigationSubscription.unsubscribe(); }
    }

    public trackByFn(index: number, item: Material) {
        if (!item) { return null; }
        return item.id;
    }

    private update(): void {
        this.updateLatest();
        this.updatePinned();
    }

    private parseLatest(pageable: PagedList<Material>): void {
        this.latest = pageable.results;
    }

    private parsePinned(pageable: PagedList<Material>): void {
        this.pinned = pageable.results;
    }

    private updateLatest(): void {
            this.$latest = this.materialService
                .getLatest()
                .subscribe(data => {
                        this.parseLatest(data);

                    },
                    null,
                    () => this.cd.markForCheck());

    }

    private updatePinned(): void {
            this.$pinned = this.materialService
                .getTop()
                .subscribe(data => {
                        this.parsePinned(data);

                    },
                    null,
                    () => this.cd.markForCheck());

    }
}
