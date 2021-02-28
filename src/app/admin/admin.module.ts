import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { NgxsModule } from '@ngxs/store';

import { BreadcrumbService } from '@base/breadcrumbs';
import { ADMIN_ROUTE } from '@constants/index';

import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
import { adminRoutes } from '@admin/admin.routes';
import { AdminService } from '@admin/services/admin.service';
import { AdminState } from '@admin/store/admin.state';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule.forChild(adminRoutes),
        NgxsModule.forFeature([AdminState])
    ],
    declarations: [
        AdminHomeComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${ADMIN_ROUTE}`, 'Админка');
//        this.breadcrumbService.hideRouteRegex(`^/${CLUBS_ROUTE}/[0-9]+$`);
    }
}
