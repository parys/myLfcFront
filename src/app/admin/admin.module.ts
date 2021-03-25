import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { NgxsModule, Store } from '@ngxs/store';

import { BreadcrumbService } from '@base/breadcrumbs';
import { ADMIN_ROUTE } from '@constants/index';

import { AdminHomeComponent } from '@admin/pages/admin-home/admin-home.component';
import { adminRoutes } from '@admin/admin.routes';
import { AdminService } from '@admin/services/admin.service';
import { AdminState } from '@admin/store/admin.state';
import { SignalRService } from '@base/signalr';
import { AdminActions } from './store';

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
        private breadcrumbService: BreadcrumbService,
        private signalRService: SignalRService,
        private store: Store
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${ADMIN_ROUTE}`, 'Админка');
//        this.breadcrumbService.hideRouteRegex(`^/${CLUBS_ROUTE}/[0-9]+$`);

        this.signalRService.on('updateMatCommCount',
            (data: string) => {
                this.store.dispatch(new AdminActions.UpdateMaterialCommentsCount(data));
            });
        this.signalRService.on('updateUserNumbers',
            (data: string) => {
                this.store.dispatch(new AdminActions.UpdateUsersNumbersCount(data));
            });
        this.signalRService.on('updateCommentVotes',
            (data: string) => {
                this.store.dispatch(new AdminActions.UpdateCommentVotes(data));
            });
    }
}
