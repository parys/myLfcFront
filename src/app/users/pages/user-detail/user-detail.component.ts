import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@base/auth';

import { UserService } from '@users/user.service';
import { ObserverComponent } from '@domain/base';
import { Store, Select } from '@ngxs/store';
import { AuthState } from '@auth/store';
import { Observable } from 'rxjs';
import { UserActions, UsersState } from '@users/store';
import { GetUserDetailQuery } from '@network/shared/users';
import { MatDialog } from '@angular/material/dialog';
import { ChangeRoleGroupDialogData, ChangeRoleGroupDialogComponent } from '@users/components/change-role-group-dialog/change-role-group-dialog.component';
import { RoleGroup } from '@role-groups/models/role-group.model';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserDetailComponent extends ObserverComponent implements OnInit {
    public roleGroups: RoleGroup[];
    public banForm: FormGroup;
    public selectedUserId: number;
    public banDaysCount = 0;

    @Select(AuthState.isAdminAssistant) isAdminAssistant$: Observable<boolean>;

    @Select(AuthState.isModerator) isModerator$: Observable<boolean>;

    @Select(AuthState.userId) userId$: Observable<number>;

    @Select(UsersState.user) user$: Observable<GetUserDetailQuery.Response>;

    @Select(AuthState.isMainModerator) isMainModerator$: Observable<boolean>;

    constructor(
        private service: UserService,
        public dialog: MatDialog,
        private store: Store,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private authService: AuthService) {
        super();
    }

    public ngOnInit(): void {
        this.initBanForm();
    }

    public logout(): void {
        this.authService.logout();
    }

    public onSubmitBan(userId: number): void {
        const banDaysCount = this.banForm.controls['banDaysCount'].value;
        const sub = this.service.ban(userId, banDaysCount)
            .subscribe((data: boolean) => {
                if (data) {
                    const time = new Date();
                  // todo  this.item.lockoutEnd = new Date(time.setHours(time.getHours() + banDaysCount * 24 * 60 * 60));
                    this.banForm.controls['banDaysCount'].patchValue(null);
                }
            });

        this.subscriptions.push(sub);
    }

    public onChangeAvatar(event: any): void {
        const file = event.currentTarget.files[0];
        if (file) {
            if (file.size > 251 * 1024) {
                alert('Размер изображения не должен превышать 250КБ');
                return;
            }
            this.store.dispatch(new UserActions.UpdateAvatar(file));
        }
    }

    public resetAvatar(userId: number): void {
        this.store.dispatch(new UserActions.ResetAvatar(userId));
    }

    public unban(userId: number): void {
        const sub = this.service.unban(userId)
            .subscribe((data: boolean) => {
                if (data) {
                 // todo   this.item.lockoutEnd = null;
                }
            });
        this.subscriptions.push(sub);
    }

    public writePm(userId: number): void {
        this.selectedUserId = userId;
    }

    public closePmWindow(event: any): void {
        this.selectedUserId = null;
    }

    public onEditRoleGroup(): void {
        const data: ChangeRoleGroupDialogData = {
            user: this.store.selectSnapshot(UsersState.user)
        };
        const changeRoleGpoupDialogRef = this.dialog.open(ChangeRoleGroupDialogComponent, {
            data
        });

        changeRoleGpoupDialogRef.afterClosed().subscribe(() => this.cd.markForCheck());
    }

    private initBanForm(): void {
        this.banForm = this.formBuilder.group({
            banDaysCount: ['', Validators.min(1)]
        });
    }
}
