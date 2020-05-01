import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

@Component({
    selector: 'user-online-counter',
    templateUrl: './user-online-counter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOnlineCounterComponent {
    @Input() public usersOnline: UsersOnline;
}
