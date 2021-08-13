import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxsModule } from '@ngxs/store';

import { CropImageFormFieldModule } from '@widgets/non-http/crop-image-form-field';

import { PersonEditComponent } from '@persons/shared/person-edit';
import { PersonService } from '@persons/person.service';
import { PersonEditService } from './person-edit.service';
import { PersonEditState } from './store';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        CropImageFormFieldModule,
        NgxsModule.forFeature([PersonEditState]),
    ],
    declarations: [
        PersonEditComponent
    ],
    exports: [
        PersonEditComponent,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule
    ],
    providers: [
        PersonService,
        PersonEditService
    ]
})
export class PersonEditModule { }
