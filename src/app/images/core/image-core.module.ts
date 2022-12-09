import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageService } from './image.service';
import { ImageAdditionComponent } from './image-addition';
import { ImageCropAdditionComponent } from './image-crop-addition';

@NgModule({
    imports: [
        CommonModule,
        ImageCropperModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        ImageAdditionComponent,
        ImageCropAdditionComponent
    ],
    exports: [
        ImageAdditionComponent,
        ImageCropAdditionComponent
    ],
    providers: [
        ImageService
    ]
})
export class ImageCoreModule { }
