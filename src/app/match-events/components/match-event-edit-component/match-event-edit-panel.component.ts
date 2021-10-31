import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MatchEvent, MatchEventType } from '@domain/models';
import { MatchPersonsState } from '@match-persons/store';
import { GetMatchPersonsListQuery } from '@network/shared/match-persons';

@Component({
    selector: 'match-event-edit-panel',
    templateUrl: './match-event-edit-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatchEventEditPanelComponent implements OnInit {
    @Input() public selectedEvent: MatchEvent;
    @Input() public matchId: number;
    @Input() public types: MatchEventType[];
    @Output() public updated = new EventEmitter<MatchEvent>();

    @Select(MatchPersonsState.flatMatchPersons) flatMatchPersons$: Observable<GetMatchPersonsListQuery.MatchPersonListDto[]>;

    public editMatchEventForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.initForm();
    }

    public onSubmit(): void {
        this.updated.emit(this.editMatchEventForm.value);
    }

    private initForm(): void {
        this.editMatchEventForm = this.formBuilder.group({
            id: [this.selectedEvent.id],
            personName: [this.selectedEvent ? this.selectedEvent.personName : ''],
            personId: [this.selectedEvent ? this.selectedEvent.personId : '', Validators.required],
            type: [this.selectedEvent ? this.selectedEvent.type : '', Validators.required],
            minute: [this.selectedEvent ? this.selectedEvent.minute : '', Validators.required],
            addMinutes: [this.selectedEvent ? this.selectedEvent.addMinutes : ''],
            isOur: [this.selectedEvent ? this.selectedEvent.isOur : true]
        });
    }
}
