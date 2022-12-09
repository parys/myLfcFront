import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { accountRoutes } from './account.routes';
import { AccountSignupComponent } from './account-signup';
import { ChangePasswordComponent } from './changePassword';
import { ConfirmEmailComponent } from './confirmEmail';
import { ForgotPasswordComponent } from './forgotPassword';
import { ResetPasswordComponent } from './resetPassword';
import { UnconfirmedEmailComponent } from './unconfirmedEmail';
import { AccountValidators } from './account.validators';
import { RecaptchaModule } from '@widgets/recaptcha';
import { BreadcrumbService } from '@base/breadcrumbs';
import { AccountService } from './account.service';
import { ACCOUNT_ROUTE } from '@constants/index';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(accountRoutes),
        RecaptchaModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        AccountSignupComponent,
        ChangePasswordComponent,
        ConfirmEmailComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        UnconfirmedEmailComponent
    ],
    providers: [
        AccountValidators,
        AccountService
    ]
})
export class AccountModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.hideRouteRegex(`^/${ACCOUNT_ROUTE}$`);
        this.breadcrumbService.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/signup`, 'Регистрация');
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${ACCOUNT_ROUTE}/confirmEmail`, 'Подтверждение пароля');
        this.breadcrumbService.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/forgotPassword`, 'Восстановление забытого пароля');
        this.breadcrumbService.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/unconfirmedEmail`, 'Ваша почта не подтверждена');
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${ACCOUNT_ROUTE}/resetPassword`, 'Сброс пароля');
        this.breadcrumbService.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/changePassword`, 'Изменение пароля');
    }
}
