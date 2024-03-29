import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxsModule } from '@ngxs/store';

import { PersonEditModule } from '@persons/shared';
import { SelectPersonFormFieldModule } from '@widgets/http/select-person-form-field';

import { MatchPersonEditPanelComponent } from '@match-persons/components/match-person-edit-panel';
import { MatchPersonService } from '@match-persons/match-person.service';
import { MatchPersonPanelComponent } from '@match-persons/components/match-person-panel';
import { MatchPersonMaterialModule } from '@match-persons/match-person-material.module';
import { MatchPersonInfoComponent } from '@match-persons/components/match-person-info';
import { MatchPersonsState } from './store';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        PersonEditModule,
        SelectPersonFormFieldModule,
        MatchPersonMaterialModule,
        NgxsModule.forFeature([MatchPersonsState])
    ],
    declarations: [
        MatchPersonEditPanelComponent,
        MatchPersonPanelComponent,
        MatchPersonInfoComponent
    ],
    exports: [
        MatchPersonEditPanelComponent,
        MatchPersonPanelComponent
    ],
    providers: [
        MatchPersonService
    ]
})
export class MatchPersonModule { }
