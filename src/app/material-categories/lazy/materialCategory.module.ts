import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { BreadcrumbService } from '@base/breadcrumbs';
import { BLOG_CATEGORIES_ROUTE, NEWS_CATEGORIES_ROUTE } from '@constants/routes.constants';

import { materialCategoryRoutes } from '@material-categories/lazy/materialCategory.routes';
import { MaterialCategoryListPageComponent } from '@material-categories/lazy/material-сategory-list-page';
import { MaterialCategoryEditPageComponent } from '@material-categories/lazy/material-category-edit-page';
import { MaterialCategoryCoreModule } from '@material-categories/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(materialCategoryRoutes),
        MaterialCategoryCoreModule,
        MatInputModule
    ],
    declarations: [
        MaterialCategoryListPageComponent,
        MaterialCategoryEditPageComponent
    ]
})
export class MaterialCategoryModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${BLOG_CATEGORIES_ROUTE}`, 'Категории блогов');
        this.breadcrumbService.hideRouteRegex(`^/${BLOG_CATEGORIES_ROUTE}/[0-9]+$`);
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${NEWS_CATEGORIES_ROUTE}`, 'Категории новостей');
        this.breadcrumbService.hideRouteRegex(`^/${NEWS_CATEGORIES_ROUTE}/[0-9]+$`);
    }
}
