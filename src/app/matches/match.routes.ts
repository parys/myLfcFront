import { Routes } from '@angular/router';

import { RoleGuard, RolesEnum } from '@base/auth';
import { EDITING_RU, MATCHES_RU, MATCH_RU, EDIT_ROUTE } from '@constants/index';

import { MatchListComponent } from '@matches/pages/match-list';
import { MatchDetailComponent } from '@matches/pages/match-detail';
import { MatchEditComponent } from '@matches/pages/match-edit';
import { MatchEditResolver, MatchResolver } from './resolvers';

export const matchRoutes: Routes = [
    {
        path: '',
        component: MatchListComponent,
        data: {
            title: MATCHES_RU,
            roles: [RolesEnum[RolesEnum.InfoStart]]
        },
        canActivate: [RoleGuard]
    },
    {
        path: ':id',
        children: [
            {
                path: '',
                component: MatchDetailComponent,
                resolve: [MatchResolver]
            },
            {
                path: EDIT_ROUTE,
                component: MatchEditComponent,
                data: {
                    title: EDITING_RU,
                    roles: [RolesEnum[RolesEnum.InfoStart]]
                },
                resolve: [MatchEditResolver],
                canActivate: [RoleGuard]
            }
        ]
    }
];
