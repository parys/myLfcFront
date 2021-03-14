import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { ObserverComponent } from '@domain/base';
import { Select } from '@ngxs/store';
import { AuthState } from '@auth/store';
import { Observable } from 'rxjs';
import { ConfirmationMessage } from '@notices/shared';
import { NotifierService } from '@notices/services';
import { MatchPerson } from '@match-persons/models/match-person.model';
import { GetMatchPersonsListQuery } from '@network/shared/match-persons/get-match-persons-list.query';

@Component({
    selector: 'match-person-info',
    templateUrl: './match-person-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchPersonInfoComponent extends ObserverComponent {
    @Input() public person: MatchPerson | GetMatchPersonsListQuery.MatchPersonListDto;
    @Input() public isHome: boolean;
    @Input() public isPlayer: boolean;
    @Input() public matchId: number;
    @Output() public selected = new EventEmitter<MatchPerson | GetMatchPersonsListQuery.MatchPersonListDto>();
    @Output() public delete = new EventEmitter<MatchPerson | GetMatchPersonsListQuery.MatchPersonListDto>();

    @Select(AuthState.isInformer) isInformer$: Observable<boolean>;

    constructor(private notifier: NotifierService) {
        super();
    }
    public onSelectPerson(person: MatchPerson | GetMatchPersonsListQuery.MatchPersonListDto): void {
        this.selected.emit(person);
    }

    public showDeleteModal(person: MatchPerson | GetMatchPersonsListQuery.MatchPersonListDto): void {
        const sub$ = this.notifier.confirm(new ConfirmationMessage({
            title: 'Удалить ?'
        }))
        .subscribe(result => {
            if (result) {
                person.matchId = this.matchId;
                this.delete.emit(person);
            }
        });
        this.subscriptions.push(sub$);
    }
}
