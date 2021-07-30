import { Routes } from '@angular/router';

import { RoleGuard, RolesEnum } from '@base/auth';
import { EDITING_RU } from '@constants/ru.constants';

import { MaterialEditComponent } from './pages/material-edit.component';
import { MaterialLeaveGuard } from './leave-guard/leave-guard.service';
import { EditMaterialResolver } from './resolvers';

export const materialEditRoutes: Routes = [
    {
        path: '',
        component: MaterialEditComponent,
        data: {
            title: EDITING_RU,
            roles: [RolesEnum[RolesEnum.NewsStart], RolesEnum[RolesEnum.BlogStart]]
        },
        canActivate: [RoleGuard],
        canDeactivate: [MaterialLeaveGuard],
        resolve: { EditMaterialResolver }
    }
];
