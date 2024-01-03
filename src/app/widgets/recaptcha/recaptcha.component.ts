import { Component, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: "recaptcha",
    template: ` <!--<re-captcha *ngIf="isBrowser"
    language="ru"
    size="small"
    (captchaExpired)="resetCaptch($event)"
    (captchaResponse)="handleCorrectCaptcha($event)"
    site_key="6Ld0AxEUAAAAAA9BH17mRd8MDPqLGDzSomOEeeIY">
                 [size]="'compact'"
</re-captcha>-->
                <re-captcha (resolved)="handleCorrectCaptcha($event)"
                 siteKey="6Ld0AxEUAAAAAA9BH17mRd8MDPqLGDzSomOEeeIY"
                 (errored)="resetCaptch($event)"
                  errorMode="handled"
                 ></re-captcha>`
})
export class RecaptchaComponent {
    public isBrowser = false;
    @Output() public isHuman = new EventEmitter<boolean>();


    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public handleCorrectCaptcha(event: any): void {
        if (event) {
            this.isHuman.emit(true);
        } else {
            this.isHuman.emit(false);
        }
    }

    public resetCaptch(event: any): void {
        this.isHuman.emit(false);
    }
}
