import { GetUserDetailQuery, ChangeUserRoleGroupCommand } from '@network/shared/users';
import { UserFilters } from '@users/models/user-filters.model';
import { User } from '@users/models/user.model';

export class SetUser {
    static readonly type = '[Users] Set logged user';
    constructor(public payload: User) { }
}

export class GetRoleGroups {
    static readonly type = '[Users] Get role groups';
}

export class GetUsersList {
    static readonly type = '[Users] Get users list';
}

export class SetPmReceiverId {
    static readonly type = '[Users] Set pm receiver id';
    constructor(public payload: { id: number, userName: string }) { }
}

export class ChangeSort {
    static readonly type = '[Users] Change users sort';
    constructor(public readonly payload: { sortOn: string; sortDirection: string; currentPage: number; }) { }
}

export class ChangePage {
    static readonly type = '[Users] Change users page';
    constructor(public readonly payload: { currentPage: number; pageSize: number; }) { }
}

export class SetUsersFilterOptions {
    static readonly type = '[Users] Set users filter options';
    constructor(public readonly payload: UserFilters & { currentPage: number }) { }
}

export class GetUserById {
    static readonly type = '[Users] Get user by id';
    constructor(public readonly payload: GetUserDetailQuery.Request) { }
}

export class ChangeUserRoleGroup {
    static readonly type = '[Users] Change user role group';
    constructor(public readonly payload: ChangeUserRoleGroupCommand.Request) { }
}
export namespace UserActions {
    export class ResetAvatar {
        static readonly type = '[Users] Reset user avatar';
        constructor(public readonly payload: number) { }
    }

    export class UpdateAvatar {
        static readonly type = '[Users] Upload user avatar';
        constructor(public readonly payload: File) { }
    }

    export class UnbanUser {
        static readonly type = '[Users] Unban user';
        constructor(public readonly payload: number) { }
    }

    export class BanUser {
        static readonly type = '[Users] Ban user';
        constructor(public readonly payload: { userId: number, days: number }) { }
    }
}
