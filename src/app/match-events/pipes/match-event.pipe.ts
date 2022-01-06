import { Pipe, PipeTransform } from '@angular/core';
import { MatchEvent } from '@domain/models';

@Pipe({ name: 'matchEvent' })
export class MatchEventPipe implements PipeTransform {

    public transform(value: MatchEvent): string {
        let result = `${value.personName} ${value.minute}'`;

        if (value.addMinutes) {
            result += ` + ${value.addMinutes}`;
        }

        return result;
    }
}
