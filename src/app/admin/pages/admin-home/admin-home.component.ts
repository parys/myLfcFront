import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { AuthState } from '@auth/store';
import { AdminActions, AdminState } from '@admin/store';

@Component({
    selector: 'admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent {

    @Select(AuthState.isInformer) isInformer$: Observable<boolean>;

    @Select(AuthState.isAdminAssistant) isAdminAssistant$: Observable<boolean>;

    @Select(AdminState.materialsNumbers) materialsNumbers$: Observable<string>;

    @Select(AdminState.usersNumbers) usersNumbers$: Observable<string>;

    constructor(private store: Store) {
        
    }

    public updateMaterialCommentCounts(): void {
        this.store.dispatch(new AdminActions.RecalculateMaterialComments());
    }

    public updateUsersNumbers(): void {
        this.store.dispatch(new AdminActions.RecalculateUsersNumbers());
    }

    public calculateCommentsNumber(): void {
        this.store.dispatch(new AdminActions.CalculateCommentsNumber());
    }
}
