import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'crop-image-field',
    templateUrl: './crop-image-form-field.component.html',
    styleUrls: ['./crop-image-form-field.component.scss']
})
export class CropImageFormFieldComponent {
    @Output() cropped: EventEmitter<string> = new EventEmitter<string>();
    public imageChangedEvent: any = '';
    public croppedImage: ImageCroppedEvent;

    constructor() {}

    public onUploadImage(event: any): void  {
        this.imageChangedEvent = event;
    }

    public imageCropped(image: ImageCroppedEvent): void  {
        this.croppedImage = image;
    }

    public crop(): void {
        this.cropped.emit(this.croppedImage.base64);
        this.imageChangedEvent = '';
    }
}
