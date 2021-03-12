import { PagedQueryBase } from '@base/infrastructure';

export class UserFilters extends PagedQueryBase {
    public userName: string;
    public ip: string;
    public roleGroupId: number;
}
