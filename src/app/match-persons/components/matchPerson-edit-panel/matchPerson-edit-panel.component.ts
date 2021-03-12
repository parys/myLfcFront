import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Person } from '@domain/models';

import { MatchPersonsState } from '@match-persons/store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { GetMatchPersonsListQuery, UpdateMatchPersonCommand } from '@network/shared/match-persons';
import { MatchPersonType } from '@match-persons/models/match-person-type.model';

@Component({
    selector: 'match-person-edit-panel',
    templateUrl: './matchPerson-edit-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatchPersonEditPanelComponent implements OnInit, OnChanges {

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

    public ngOnInit(): void {
        this.initForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.editOptions) {
            this.initForm();
        }
    }

    public onSubmit(): void {
        this.create.emit(this.parseForm());
    }

    public setPerson(person: Person): void {
        this.editMatchPersonForm.controls.personId.patchValue(person.id);
        this.onSubmit();
    }

    private parseForm(): UpdateMatchPersonCommand.Request {
        const item: UpdateMatchPersonCommand.Request = this.editMatchPersonForm.value;
        item.matchId = this.matchId;
        return item;
    }

    private initForm(): void {
        const selected = this.selected;

        this.editMatchPersonForm = this.formBuilder.group({
            personId: [selected ? this.selected.personId : '', Validators.required],
            personType: [selected ? this.selected.personType : this.editOptions.mpType, Validators.required],
            useType: [true],
            isHome: [this.isHome]
        });
    }
}
