import { PagedQueryBase } from '@base/infrastructure';

export class ClubFilters extends PagedQueryBase {
    public name: string;

    public includeIds: number[];
}
