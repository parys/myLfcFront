import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { UserService } from '@users/user.service';
import { UserConfig } from '@users/models/user-config.model';

@Component({
    selector: 'user-config',
    templateUrl: './user-config.component.html'
})

export class UserConfigComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public userConfigForm: FormGroup;

    constructor(private service: UserService,
                private formBuilder: FormBuilder,
                private snackBar: MatSnackBar) { }

    public ngOnInit(): void {
        this.initUserConfigForm();
        this.sub = this.service.getConfig()
            .subscribe((data: UserConfig) => this.parse(data));
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }

    public onSubmit(): void {
        const userConfig: UserConfig = this.userConfigForm.value;
        this.service.updateConfig(userConfig)
            .subscribe((data: UserConfig) => {
                if (data) {
                    this.snackBar.open('Настройки изменены');
                } else {
                    this.snackBar.open('Настройки НЕ изменены');
                }
            });
    }

    private parse(item: UserConfig): void {
        this.userConfigForm.patchValue(item);
    }

    private initUserConfigForm(): void {
        this.userConfigForm = this.formBuilder.group({
            isReplyToPmEnabled: ['', Validators.required],
            isReplyToEmailEnabled: ['', Validators.required],
            isPmToEmailNotifyEnabled: ['', Validators.required]
        });
    }
}
