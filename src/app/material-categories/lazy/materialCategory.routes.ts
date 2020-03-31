import { Routes } from '@angular/router';
import { MaterialCategoryListPageComponent } from '@material-categories/lazy/material-сategory-list-page';
import { MaterialCategoryEditPageComponent } from '@material-categories/lazy/material-category-edit-page';
import { RoleGuard, RolesEnum } from '@base/auth';

export const materialCategoryRoutes: Routes = [
    { path: '', component: MaterialCategoryListPageComponent },
    {
        path: ':id/edit',
        component: MaterialCategoryEditPageComponent,
        data: { roles: [RolesEnum[RolesEnum.NewsFull], RolesEnum[RolesEnum.BlogFull]] },
        canActivate: [RoleGuard]
    }
];
