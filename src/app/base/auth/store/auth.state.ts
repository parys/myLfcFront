
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';

import { AuthStateModel } from './auth-state.model';
import { SetUser, SetTokens, Logout } from './auth.actions';
import { RolesEnum } from '@auth/models';


@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        user: null,
        tokens: null
    },
})
@Injectable()
export class AuthState {

    private static isInRole(state: AuthStateModel, role: string): boolean {
        let roles = state.user && state.user.role ? state.user.role : [];
        
        // if 1 role so it's just string
        if(!Array.isArray(roles)) {
            roles = [roles];
        }
        
        const updatedRoles = roles.map(x => x.toLowerCase());
        return updatedRoles.includes(role.toLowerCase());
    }

    @Selector()
    static user(state: AuthStateModel) {
        return state.user;
    }

    @Selector()
    static userId(state: AuthStateModel) {
        return state.user ? +state.user.sub : null;
    }

    @Selector()
    static userName(state: AuthStateModel) {
        return state.user ? state.user.name : null;
    }

    @Selector()
    static isLogined(state: AuthStateModel) {
        return state.user !== null;
    }

    @Selector()
    static isInformer(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.InfoStart);
    }

    @Selector()
    static isNewsmaker(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.NewsStart);
    }

    @Selector()
    static isAdmin(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.AdminFull);
    }

    @Selector()
    static isAdminAssistant(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.AdminStart);
    }

    @Selector()
    static isModerator(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.UserStart);
    }

    @Selector()
    static isMainModerator(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.UserFull);
    }

    @Selector()
    static isAuthor(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.BlogStart);
    }

    @Selector()
    static isEditor(state: AuthStateModel) {
        return AuthState.isInRole(state, RolesEnum.BlogFull) || AuthState.isInRole(state, RolesEnum.NewsFull);
    }

    @Selector()
    static isSiteMember(state: AuthStateModel) {
        return state.user !== null && (AuthState.isInRole(state, RolesEnum.NewsStart)
        || AuthState.isInRole(state, RolesEnum.UserStart)
        || AuthState.isInRole(state, RolesEnum.AdminStart)
        || AuthState.isInRole(state, RolesEnum.BlogStart)
        || AuthState.isInRole(state, RolesEnum.InfoStart));
    }

    static isSelf(userId: number) {
        return createSelector(
            [AuthState],
            (state: AuthStateModel) => {
                return state.user.sub === userId;
            }
        );
    }

    @Action(SetUser)
    onSetUser({ patchState }: StateContext<AuthStateModel>, { payload }: SetUser) {
        patchState({ user: { ...payload } });
    }

    @Action(SetTokens)
    onSetTokens({ patchState }: StateContext<AuthStateModel>, { payload }: SetTokens) {
        patchState({ tokens: { ...payload } });
    }

    @Action(Logout)
    onLogout({ patchState }: StateContext<AuthStateModel>) {
        patchState({ tokens: null, user: null });
    }


}
