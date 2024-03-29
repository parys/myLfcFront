import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { State, Action, StateContext, Selector } from '@ngxs/store';


import { NoticeMessage } from '@notices/shared';
import { ShowNotice } from '@notices/store';
import { CustomTitleMetaService } from '@core/services';

import { UsersStateModel } from './users.model';
import {
    GetRoleGroups,
    GetUsersList,
    ChangeSort,
    SetPmReceiverId,
    ChangePage,
    SetUsersFilterOptions,
    GetUserById,
    ChangeUserRoleGroup,
    UserActions
} from './users.actions';
import { RoleGroupService } from '@role-groups/core';

import { GetUsersListQuery, GetUserDetailQuery } from '@network/shared/users';
import { UserService } from '@users/user.service';
import { RoleGroup } from '@role-groups/models/role-group.model';


@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: [],
        user: null,
        roleGroups: [],
        request: new GetUsersListQuery.Request({ currentPage: 1, pageSize: 15, sortDirection: 'desc', sortOn: 'lastModified' }),
        pmReceiver: null
    },
})
@Injectable()
export class UsersState {

    @Selector()
    static user(state: UsersStateModel) {
        return state.user;
    }

    @Selector()
    static users(state: UsersStateModel) {
        return state.users;
    }

    @Selector()
    static userId(state: UsersStateModel) {
        return state.user ? state.user.id : null;
    }

    @Selector()
    static pmReceiver(state: UsersStateModel) {
        return state.pmReceiver;
    }

    @Selector()
    static userName(state: UsersStateModel) {
        return state.user ? state.user.userName : null;
    }

    @Selector()
    static roleGroups(state: UsersStateModel) {
        return state.roleGroups;
    }

    @Selector()
    static request(state: UsersStateModel) {
        return state.request;
    }

    constructor(protected network: RoleGroupService, protected usersNetwork: UserService,
        private titleService: CustomTitleMetaService) { }

    @Action(ChangeSort)
    @Action(ChangePage)
    @Action(SetUsersFilterOptions)
    onChangeSort({ patchState, getState, dispatch }: StateContext<UsersStateModel>, { payload }: ChangeSort) {
        const { request } = getState();
        patchState({ request: { ...request, ...payload } });
        dispatch(new GetUsersList());
    }

    @Action(GetUsersList)
    onGetUsersList(ctx: StateContext<UsersStateModel>) {
        const { request } = ctx.getState();
        return this.usersNetwork.getAll2(new GetUsersListQuery.Request(request))
            .pipe(
                tap((response: GetUsersListQuery.Response) => {
                    ctx.patchState({ users: response.results || [] });
                    ctx.patchState({
                        request: {
                            ...request, rowCount: response.rowCount,
                            currentPage: response.currentPage, pageSize: response.pageSize
                        }
                    });
                }));
    }


    @Action(GetRoleGroups)
    onGetRoleGroups({ patchState, getState }: StateContext<UsersStateModel>) {
        const { roleGroups } = getState();
        if (roleGroups.length === 0) {
            return this.network.getAll()
                .pipe(
                    tap((response: RoleGroup[]) => { patchState({ roleGroups: response || [] }); }),
                );
        }
    }

    @Action(SetPmReceiverId)
    onSetPmReceiverId({ patchState }: StateContext<UsersStateModel>, { payload }: SetPmReceiverId) {
        patchState({ pmReceiver: payload });
    }

    @Action(GetUserById)
    onGetUserById({ patchState }: StateContext<UsersStateModel>, { payload }: GetUserById) {
        return (payload.id ? this.usersNetwork.getSingle2(payload.id) : of(new GetUserDetailQuery.Response()))
            .pipe(
                tap((user: GetUserDetailQuery.Response) => {
                    patchState({ user });
                    this.titleService.setTitle('Пользователь ' + user.userName);
                })
            );
    }

    @Action(ChangeUserRoleGroup)
    onChangeUserRoleGroup(ctx: StateContext<UsersStateModel>, { payload }: ChangeUserRoleGroup) {
        const { user } = ctx.getState();
        return this.usersNetwork.updateRoleGroup(payload.userId, payload.roleGroupId).pipe(
            tap(response => {
                ctx.patchState({ user: { ...user, roleGroupId: payload.roleGroupId } });
                const notice = NoticeMessage.success('Роль изменена', 'Группа пользователя заменена.');
                ctx.dispatch(new ShowNotice(notice));
            }));
    }

    @Action(UserActions.ResetAvatar)
    onResetAvatar({ patchState, getState }: StateContext<UsersStateModel>, { payload }: UserActions.ResetAvatar) {
        return this.usersNetwork.resetAvatar(payload)
            .pipe(
                tap((path: string) => {
                    const { user } = getState();
                    patchState({ user: { ...user, photo: path } });
                })
            );
    }

    @Action(UserActions.UpdateAvatar)
    onUpdateAvatar({ patchState, getState }: StateContext<UsersStateModel>, { payload }: UserActions.UpdateAvatar) {
        return this.usersNetwork.updateAvatar(payload)
            .pipe(
                tap(path => {
                    const { user } = getState();
                    patchState({ user: { ...user, photo: `${path}?${Math.random()}` } });
                })
            );
    }

    @Action(UserActions.UnbanUser)
    onUnbanUser({ patchState, getState }: StateContext<UsersStateModel>, { payload }: UserActions.UnbanUser) {
        return this.usersNetwork.unban(payload)
            .pipe(
                tap(path => {
                    const { user } = getState();
                    patchState({ user: { ...user, lockoutEnd: null } });
                })
            );
    }

    @Action(UserActions.BanUser)
    onBanUser({ patchState, getState }: StateContext<UsersStateModel>, { payload }: UserActions.BanUser) {
        return this.usersNetwork.ban(payload.userId, payload.days)
            .pipe(
                tap(path => {
                    const { user } = getState();
                    const time = new Date();
                    patchState({ user: { ...user, lockoutEnd: new Date(time.setHours(time.getHours() + payload.days * 24 * 60 * 60)) } });
                })
            );
    }

}
