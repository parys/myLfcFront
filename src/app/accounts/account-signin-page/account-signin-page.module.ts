import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountSigninWidgetModule } from '@widgets/http/account-signin-widget';

import { AccountSigninPageComponent } from './account-signin-page.component';
import { accountSigninPageRoutes } from './account-signin-page.routes';
import { BreadcrumbService } from '@base/breadcrumbs';
import { ACCOUNT_ROUTE } from '@constants/routes.constants';

@NgModule({
    imports: [
        RouterModule.forChild(accountSigninPageRoutes),
        AccountSigninWidgetModule
    ],
    declarations: [
        AccountSigninPageComponent
    ]
})
export class AccountSigninPageModule {
    constructor(breadcrumbService: BreadcrumbService
    ) {
        breadcrumbService.hideRouteRegex(`^/${ACCOUNT_ROUTE}$`);
        breadcrumbService.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/signin`, 'Вход');
    }
 }
