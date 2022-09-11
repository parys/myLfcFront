import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { MatchService } from '@matches/match.service';
import { Match, MatchType, PagedList } from '@domain/models';
import { StadiumService } from '@stadiums/core';
import { MATCHES_ROUTE } from '@constants/routes.constants';
import { DEBOUNCE_TIME } from '@constants/app.constants';
import { Stadium } from '@stadiums/models/stadium.model';
import { StadiumFilters } from '@stadiums/models/stadium-filters.model';
import { MatchesState } from '@matches/store';
import { GetMatchDetailQuery } from '@network/shared/matches';
import { Select, Store } from '@ngxs/store';

@Component({
    selector: 'match-edit',
    templateUrl: './match-edit.component.html'
})

export class MatchEditComponent implements OnInit {
    private id: number;
    public editMatchForm: FormGroup;
    public stadiums$: Observable<Stadium[]>;

    @Select(MatchesState.matchTypes) matchTypes$: Observable<MatchType[]>;

    constructor(private matchService: MatchService,
                private stadiumService: StadiumService,
                private router: Router,
                private store: Store,
                private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        const match = this.store.selectSnapshot(MatchesState.match);
        this.initForm2(match);
      //  this.parse(match);

        this.initStadiums();
    }

    public onSubmit(): void {
        const match = this.parseForm();
        this.matchService.createOrUpdate(this.id, match)
            .subscribe((data: Match) => this.router.navigate([MATCHES_ROUTE, data.id]));
    }

    public selectStadium(id: number) {
        this.editMatchForm.get('stadiumId').patchValue(id);
    }

    public onClearSeason(event: any): void {
        this.editMatchForm.get('seasonName').patchValue(null);
        this.editMatchForm.get('seasonId').patchValue(null);
    }

    private parseForm(): Match {
        const item = this.editMatchForm.value;
        item.id = this.id;
        const date = this.editMatchForm.controls.date.value;
        const time = this.editMatchForm.controls.time.value;
        item.stadiumId = item.stadiumName ? item.stadiumId : null;
        item.seasonId = item.seasonName ? item.seasonId : null;

        item.dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.slice(0, 2), time.slice(3, 5));
        return item;
    }

    private initForm2(match: GetMatchDetailQuery.Response): void {
        this.id = match?.id;
        this.editMatchForm = this.formBuilder.group({
            clubName: [match?.clubName],
            clubId: [match?.clubId, Validators.required],
            seasonId: [match?.seasonId],
            seasonName: [match?.seasonName],
            isHome: [match?.isHome ?? false, Validators.required],
            date: [new Date(match?.dateTime), Validators.required],
            time: [new Date(match?.dateTime).toTimeString().slice(0, 8), Validators.required],
            postponed: [match?.postponed ?? false],
            typeId: [match?.typeId, Validators.required],
            stadiumId: [match?.stadiumId],
            stadiumName: [match?.stadiumName],
            photoUrl: [match?.photoUrl],
            videoUrl: [match?.videoUrl],
            previewId: [match?.previewId],
            reportId: [match?.reportId]
        });
    }

    private initStadiums(): void {
        this.stadiums$ = this.editMatchForm.controls.stadiumName.valueChanges.pipe(
            debounceTime(DEBOUNCE_TIME),
            distinctUntilChanged(),
            switchMap((value: string) => {
                const filter = new StadiumFilters();
                filter.name = value;
                return this.stadiumService.getAll(filter);
            }),
            switchMap((pagingStadiums: PagedList<Stadium>): Observable<Stadium[]> => {
                return of(pagingStadiums.results);
            }));
    }
}
