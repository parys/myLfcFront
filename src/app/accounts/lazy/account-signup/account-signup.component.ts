﻿import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRegisterModel, AuthService } from '@base/auth';
import { AccountService } from '@accounts/lazy/account.service';
import { AccountValidators } from '@accounts/lazy/account.validators';

@Component({
    selector: 'account-signup',
    templateUrl: './account-signup.component.html'
})

export class AccountSignupComponent implements OnInit {
    public registerForm: FormGroup;
    public result = false;
    public isHuman = false;
    public isAgreeWithRules = false;

    constructor(private accountService: AccountService,
                private authService: AuthService,
                private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ]), new AccountValidators(this.accountService).isUserNameUnique],
            email: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.email
            ]),
                new AccountValidators(this.accountService).isEmailUnique],
            password: ['', Validators.compose([
                Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.compose([
                Validators.required, Validators.minLength(6)])]
        }, { validator: AccountValidators.matchingPasswords('password', 'confirmPassword') });
    }

    public onSubmit(): void {
        const signup: IRegisterModel = this.registerForm.value;

        this.authService
            .register(signup)
            .subscribe((data: boolean) => this.result = data);
        this.isHuman = false;
    }
}
