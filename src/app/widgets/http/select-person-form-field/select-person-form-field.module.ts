import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { SelectPersonFormFieldComponent } from './select-person-form-field/select-person-form-field.component';
import { PersonService } from '@persons/person.service'; // todo temporary
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [SelectPersonFormFieldComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    exports: [
        SelectPersonFormFieldComponent
    ],
    providers: [
        PersonService
    ]
})
export class SelectPersonFormFieldModule { }
