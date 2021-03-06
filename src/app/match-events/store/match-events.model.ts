import { MatchEventType } from '@domain/models/match-event-type.model';
import { MatchEvent } from '@domain/models/match-event.model';

export interface MatchEventsStateModel {
    matchEventTypes: MatchEventType[];
    matchEvents: MatchEvent[];
    editable: MatchEvent;
}
