import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Person } from '@domain/models';

import { MatchPersonsState } from '@match-persons/store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { GetMatchPersonsListQuery, UpdateMatchPersonCommand } from '@network/shared/match-persons';
import { MatchPersonType } from '@match-persons/models/match-person-type.model';

@Component({
    selector: 'match-person-edit-panel',
    templateUrl: './match-person-edit-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatchPersonEditPanelComponent implements OnChanges {

    @Input() public matchId: number;
    @Input() public selected: GetMatchPersonsListQuery.MatchPersonListDto;
    @Input() public editOptions: {
        isEdit: boolean,
        mpType: number,
        currentCount: number,
        neededCount: number,
        personTypeId: number};
    @Input() public isHome: boolean;
    @Output() public create = new EventEmitter<UpdateMatchPersonCommand.Request>();
    public editMatchPersonForm: FormGroup;
    public isCreation: boolean;

    @Select(MatchPersonsState.matchPersonTypes) types$: Observable<MatchPersonType[]>;

    constructor(private formBuilder: FormBuilder) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.editOptions) {
            this.initForm();
        }
    }

    public onSubmit(): void {
        if (this.editMatchPersonForm.valid) {
            this.create.emit(this.editMatchPersonForm.value);
        }
    }

    public setPerson(person: Person): void {
        this.editMatchPersonForm.controls.personId.patchValue(person.id);

        this.onSubmit();
    }

    public getControl(): FormControl {
        return this.editMatchPersonForm.controls.personId as FormControl;
    }

    private initForm(): void {
        const selected = this.selected;
        this.editMatchPersonForm = this.formBuilder.group({
            personId: [selected ? selected.personId : '', Validators.required],
            personType: [selected?.personName ? selected.personType : this.editOptions.mpType, Validators.required],
            useType: [true],
            isHome: [this.isHome],
            matchId: [this.matchId, Validators.required],
            number: [selected?.number ?? null]
        });
    }
}
