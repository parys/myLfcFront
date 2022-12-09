import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { BreadcrumbService } from '@base/breadcrumbs';
import { STADIUMS_ROUTE } from '@constants/routes.constants';
import { STADIUMS_RU } from '@constants/ru.constants';
import { PaginationModule } from '@base/pagination/pagination.module';

import { StadiumListComponent } from '@stadiums/lazy/stadium-list';
import { StadiumEditComponent } from '@stadiums/lazy/stadium-edit';
import { stadiumRoutes } from '@stadiums/lazy/stadium.routes';
import { StadiumCoreModule } from '@stadiums/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(stadiumRoutes),
        StadiumCoreModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        PaginationModule
    ],
    declarations: [
        StadiumEditComponent,
        StadiumListComponent
    ]
})
export class StadiumModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${STADIUMS_ROUTE}`, STADIUMS_RU);
        this.breadcrumbService.hideRouteRegex(`^/${STADIUMS_ROUTE}/[0-9]+$`);
    }
}
