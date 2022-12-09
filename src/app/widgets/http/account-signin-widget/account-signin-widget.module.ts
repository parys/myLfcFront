import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { CommonModule } from '@angular/common';

import { AccountSigninWidgetComponent } from './account-signin-widget.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AccountSigninWidgetComponent
    ],
    exports: [
        AccountSigninWidgetComponent,
    ]
})
export class AccountSigninWidgetModule { }
