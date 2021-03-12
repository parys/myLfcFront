import { Match } from "@domain/models/match.model";


export class SeasonMonth {
    public name: string;
    public collapsed: boolean;
    public matches: Match[];
}
