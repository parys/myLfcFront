import { Routes } from '@angular/router';

import { RoleGuard, RolesEnum } from '@base/auth';

import { AdminHomeComponent } from '@admin/pages';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminHomeComponent,
        data: { title: 'Страничка админа', roles: [RolesEnum[RolesEnum.AdminStart]] },
        canActivate: [RoleGuard]
    }
];
