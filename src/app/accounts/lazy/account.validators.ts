﻿import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, take, switchMap } from 'rxjs/operators';

import { AccountService } from './account.service';

import { DEBOUNCE_TIME, MIN_EMAIL_LENGTH, MIN_USERNAME_LENGTH } from '@constants/index';

@Injectable()
export class AccountValidators {

    constructor(private service1: AccountService
    ) {
        AccountValidators.service = service1;
    }
    static service: AccountService;
    static changed = new Subject<any>();
    static changed1 = new Subject<any>();

    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): IValidationResult => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
            return null;
        };
    }

    public isEmailUnique(control: FormControl): Observable<IValidationResult> {
        AccountValidators.changed.next();
        return new Observable((obs: any) => {
            control
                .valueChanges.pipe(
                debounceTime(DEBOUNCE_TIME),
                takeUntil(AccountValidators.changed),
                take(1),
                switchMap((value: string) => AccountValidators.service.isEmailUnique(value))
                )
                .subscribe(
                data => {
                    if (+control.value.length < MIN_EMAIL_LENGTH || data) {
                        obs.next(null);
                    } else {
                        obs.next({ notUniqueEmail: true });
                    }
                    obs.complete();
                },
                error => {
                    obs.complete();
                });
        });
    }

    public isUserNameUnique(control: FormControl): Observable<IValidationResult> {
        AccountValidators.changed1.next();
        return new Observable((obs: any) => {
            control
                .valueChanges.pipe(
                debounceTime(DEBOUNCE_TIME),
                takeUntil(AccountValidators.changed1),
                take(1), // todo
                switchMap((value: string) => AccountValidators.service.isUserNameUnique(value))
                )
                .subscribe(
                data => {
                    if (+control.value.length < MIN_USERNAME_LENGTH || data) {
                        obs.next(null);
                    } else {
                        obs.next({ notUniqueUserName: true });
                    }
                    obs.complete();
                },
                error => {
                    obs.complete();
                });
        });
    }
}

interface IValidationResult {
    [key: string]: boolean;
}
