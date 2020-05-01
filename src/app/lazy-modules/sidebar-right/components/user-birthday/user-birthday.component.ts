import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';

import { GetUserBirthdaysQuery } from '@network/shared/right-sidebar/get-users-birthdays.query';;

@Component({
    selector: 'user-birthday',
    templateUrl: './user-birthday.component.html',
    styleUrls: ['./user-birthday.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBirthdayComponent implements OnInit {
    @Input() public userBirthdays: GetUserBirthdaysQuery.UserBirthdayDto[];
    public currentUserIndex: number = null;

    constructor(private cd: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.setRandomIndex();
    }

    public goToPrevious(): void {
        if (this.currentUserIndex === 0) {
            this.currentUserIndex = this.userBirthdays.length - 1;
        } else {
            this.currentUserIndex -= 1;
        }
        this.cd.markForCheck();
    }

    public goToNext(): void {
        if (this.userBirthdays.length === this.currentUserIndex + 1) {
            this.currentUserIndex = 0;
        } else {
            this.currentUserIndex += 1;
        }
        this.cd.markForCheck();
    }

    private setRandomIndex(): void {
        const rand: number = Math.random() * (this.userBirthdays.length + 1) - 0.5;
        const intNumber = Math.round(rand);
        this.currentUserIndex = intNumber === this.userBirthdays.length ? intNumber - 1 : intNumber;
    }
}
