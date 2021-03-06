import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectPersonFormFieldModule } from '@widgets/http/select-person-form-field';

import { MatchEventEditPanelComponent } from '@match-events/components/match-event-edit-component';
import { MatchEventPanelComponent } from '@match-events/components/match-event-panel-component';
import { MatchEventsMaterialModule } from '@match-events/match-events-material.module';
import { MatchEventService } from '@match-events/matchEvent.service';
import { NgxsModule } from '@ngxs/store';
import { MatchEventsState } from './store';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatchEventsMaterialModule,
        SelectPersonFormFieldModule,
        NgxsModule.forFeature([MatchEventsState])
    ],
    declarations: [
        MatchEventEditPanelComponent,
        MatchEventPanelComponent
    ],
    exports: [
        MatchEventEditPanelComponent,
        MatchEventPanelComponent
    ],
    providers: [
        MatchEventService
    ]
})
export class MatchEventsModule { }
