import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { PaginationModule } from '@base/pagination/pagination.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

const materialModules = [
    MatIconModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    PaginationModule,
    MatButtonModule,
    MatDialogModule
];

@NgModule({
    imports: [
        CommonModule,
        ...materialModules
    ],
    exports: [
        ...materialModules
    ]
})
export class UserMaterialModule {
}
