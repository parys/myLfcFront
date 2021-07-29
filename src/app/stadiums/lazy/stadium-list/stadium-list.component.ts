import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { merge, of, Observable, fromEvent } from 'rxjs';
import { startWith, switchMap, map, catchError, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { PagedList } from '@domain/models';
import { StadiumService } from '@stadiums/core';
import { DEBOUNCE_TIME, KEYUP, PAGE, STADIUMS_ROUTE } from '@constants/index';
import { ConfirmationMessage } from '@notices/shared';
import { ObserverComponent } from '@domain/base';
import { NotifierService } from '@notices/services';
import { Stadium } from '@stadiums/models/stadium.model';
import { StadiumFilters } from '@stadiums/models/stadium-filters.model';

@Component({
    selector: 'stadium-list',
    templateUrl: './stadium-list.component.html'
})
export class StadiumListComponent extends ObserverComponent implements AfterViewInit, OnDestroy {
    public items: Stadium[];
    displayedColumns = ['name', 'city'];


    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('nameInput') nameInput: ElementRef;

    constructor(private service: StadiumService,
                private route: ActivatedRoute,
                private location: Location,
                private notifier: NotifierService) {
                    super();
    }

    public ngAfterViewInit(): void {
        const sub$ = this.route.queryParams.subscribe(qParams => {
                this.paginator.pageIndex = +qParams[PAGE] - 1 || 0;
                this.paginator.pageSize = +qParams.itemsPerPage || 15;

            });

        this.subscriptions.push(sub$);

        merge(this.sort.sortChange,
            fromEvent(this.nameInput.nativeElement, KEYUP)
                .pipe(debounceTime(DEBOUNCE_TIME),
                distinctUntilChanged())
                    )
            .subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page,
            fromEvent(this.nameInput.nativeElement, KEYUP)
                .pipe(debounceTime(DEBOUNCE_TIME),
                distinctUntilChanged()))
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.update();
                }),
                map((data: PagedList<Stadium>) => {
                    this.paginator.pageIndex = data.currentPage - 1;
                    this.paginator.pageSize = data.pageSize;
                    this.paginator.length = data.rowCount;

                    return data.results;
                }),
                catchError(() => {
                    return of([]);
                })
        ).subscribe((data: Stadium[]) => {
                    this.items = data;
                    this.updateUrl();
                });
    }

    public showDeleteModal(index: number): void {
        const sub$ = this.notifier.confirm(new ConfirmationMessage({
            title: 'Удалить ?'
        }))
        .subscribe(result => {
            if (result) {
                this.delete(index);
            }
        });
        this.subscriptions.push(sub$);
    }

    public update(): Observable<PagedList<Stadium>> {
        const filters = new StadiumFilters();
        filters.name = this.nameInput.nativeElement.value;
        filters.currentPage = this.paginator.pageIndex + 1;
        filters.pageSize = this.paginator.pageSize;
        filters.sortOn = this.sort.active;
        filters.sortDirection = this.sort.direction;

        return this.service
            .getAll(filters);
    }

    public updateUrl(): void {
        const newUrl = `${STADIUMS_ROUTE}?${PAGE}=${this.paginator.pageIndex + 1}`;
        this.location.replaceState(newUrl);
    }

    private delete(index: number): void {
        this.service.delete(this.items[index].id)
            .subscribe((res: boolean) => {
                if (res) {
                    this.items.splice(index, 1);
                    this.paginator.length -= 1;
                }
            });
    }
}
