import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';

import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AbstractControlComponent, ControlValueProvider } from '@domain/base/abstract-control.component';
import { PagedList } from '@domain/models';
import { DEBOUNCE_TIME } from '@constants/app.constants';
import { ClubService } from '@clubs/club.service';
import { Club } from '@clubs/models/club.model';
import { ClubFilters } from '@clubs/models/club-filters.model';


@Component({
    selector: 'select-club-form-field',
    templateUrl: './select-club-form-field.component.html',
    styleUrls: ['./select-club-form-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ControlValueProvider(SelectClubFormFieldComponent)
    ],
})
export class SelectClubFormFieldComponent extends AbstractControlComponent<number>
    implements OnInit, ControlValueAccessor {

    @Input() set clubName(value: string) {
        this.clubCtrl.setValue(value);
    }
    @ViewChild('selectClub') selectClub: ElementRef;

    public clubs$: Observable<Club[]>;
    public clubCtrl = new FormControl();

    constructor(private clubService: ClubService, protected cdRef: ChangeDetectorRef) {
        super(cdRef);
    }

    public ngOnInit(): void {
        this.clubs$ = this.clubCtrl.valueChanges.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged(),
            switchMap((value: string) => {
                const filter = new ClubFilters();
                filter.name = value;
                return this.clubService.getAll(filter);
            }),
            switchMap((pagingClubs: PagedList<Club>): Observable<Club[]> => {
                return of(pagingClubs.results);
            }));
    }
}
