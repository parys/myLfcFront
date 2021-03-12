import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from '@users/user.service';
import { User } from '@users/models/user.model';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})

export class UserEditComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public userEditForm: FormGroup;
    private userId: number;

    constructor(private service: UserService,
                private formBuilder: FormBuilder,
                private snackBar: MatSnackBar) { }

    public ngOnInit(): void {
        this.initUserEditForm();
        this.sub = this.service.getSingle2(0)
            .subscribe((data: User) => this.parse(data));
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }

    public onSubmit(): void {
        const user: User = this.userEditForm.value;
        if (user.birthday) {
            user.birthday = new Date(user.birthday);
            user.birthday =
                new Date(user.birthday.setHours(
                    user.birthday.getHours() + (-1) * user.birthday.getTimezoneOffset() / 60));
        }
        this.service.update(this.userId, user)
            .subscribe((data: User) => {
                if (data) {
                    this.snackBar.open('Профиль обновлен');
                } else {
                    this.snackBar.open('Профиль не обновлен');
                }
            });
    }

    private parse(item: User): void {
        if (item.birthday) {
            item.birthday = new Date(item.birthday);
        }
        this.userEditForm.patchValue(item);
        this.userId = item.id;
    }

    private initUserEditForm(): void {
        this.userEditForm = this.formBuilder.group({
            birthday: [null],
            fullName: [''],
            gender: [null, Validators.required]
        });
    }
}
