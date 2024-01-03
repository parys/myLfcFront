import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecaptchaComponent } from "./recaptcha.component";
import { RecaptchaModule } from "ng-recaptcha";

@NgModule({
    imports: [
        CommonModule,
        RecaptchaModule,        
    ],
    declarations: [
        RecaptchaComponent
    ],
    exports: [
        RecaptchaComponent
    ],
})
export class RecaptchaModuleE { }  