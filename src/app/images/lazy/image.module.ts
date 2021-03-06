﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbService } from '@base/breadcrumbs';
import { IMAGES_ROUTE } from '@constants/index';

import { ImageCoreModule } from '@images/core';
import { ImageDetailComponent } from '@images/lazy/image-detail';
import { ImageListComponent } from '@images/lazy/image-list';
import { imageRoutes } from '@images/lazy/image.routes';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(imageRoutes),
        ImageCoreModule
    ],
    declarations: [
        ImageDetailComponent,
        ImageListComponent
    ]
})
export class ImageModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${IMAGES_ROUTE}`, 'Изображения');
    }
}
