import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { SelectClubFormFieldComponent } from './select-club-form-field/select-club-form-field.component';
import { ClubService } from '@clubs/club.service'; // todo temporary
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [SelectClubFormFieldComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    exports: [
        SelectClubFormFieldComponent
    ],
    providers: [
        ClubService
    ]
})
export class SelectClubFormFieldModule { }
