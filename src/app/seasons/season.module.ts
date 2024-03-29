import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BreadcrumbService } from '@base/breadcrumbs';
import { CALENDAR_RU, SEASONS_ROUTE, STATISTICS_RU } from '@constants/index';
import { PipesModule } from '@base/pipes';

import { seasonRoutes } from '@seasons/season.routes';
import { SeasonCalendarComponent } from '@seasons/pages/season-calendar';
import { SeasonEditComponent } from '@seasons/pages/season-edit';
import { SeasonListComponent } from '@seasons/pages/season-list';
import { SeasonStatisticsComponent } from '@seasons/pages/season-statistics';
import { SeasonMaterialModule } from './season-material.module';
import { SeasonService } from '@seasons/season.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(seasonRoutes),
        PipesModule,
        SeasonMaterialModule
    ],
    declarations: [
        SeasonCalendarComponent,
        SeasonEditComponent,
        SeasonListComponent,
        SeasonStatisticsComponent
    ],
    providers: [
        SeasonService
    ]
})
export class SeasonModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${SEASONS_ROUTE}`, 'Сезоны');
        this.breadcrumbService.addFriendlyNameForRoute(`/${SEASONS_ROUTE}/calendar`, CALENDAR_RU);
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${SEASONS_ROUTE}/[0-9]+/calendar`, CALENDAR_RU);
        this.breadcrumbService.addFriendlyNameForRoute(`/${SEASONS_ROUTE}/statistics`, STATISTICS_RU);
        this.breadcrumbService.hideRouteRegex(`^/${SEASONS_ROUTE}/[0-9]+$`);
    }
}
