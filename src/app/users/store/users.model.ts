import { GetUsersListQuery, GetUserDetailQuery } from '@network/shared/users';
import { RoleGroup } from '@role-groups/models/role-group.model';

export interface UsersStateModel {
    users: GetUsersListQuery.UserListDto[];
    user: GetUserDetailQuery.Response;
    roleGroups: RoleGroup[];
    request: GetUsersListQuery.Request;
    pmReceiver: { id: number, userName: string };
}
