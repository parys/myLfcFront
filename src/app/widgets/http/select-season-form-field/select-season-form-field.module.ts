import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeasonService } from '@seasons/season.service';
import { SelectSeasonFormFieldComponent } from './select-season-form-field/select-season-form-field.component';


@NgModule({
    declarations: [SelectSeasonFormFieldComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    exports: [
        SelectSeasonFormFieldComponent
    ],
    providers: [
        SeasonService
    ]
})
export class SelectSeasonFormFieldModule { }
