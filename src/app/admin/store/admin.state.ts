import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { AdminStateModel } from './admin.model';
import { AdminActions } from './admin.actions';
import { AdminService } from '@admin/services/admin.service';


@State<AdminStateModel>({
    name: 'admin',
    defaults: {
        materialsNumbers: null,
        usersNumbers: null
    },
})
@Injectable()
export class AdminState {

    @Selector()
    static materialsNumbers(state: AdminStateModel) {
        return state.materialsNumbers;
    }

    @Selector()
    static usersNumbers(state: AdminStateModel) {
        return state.usersNumbers;
    }
    
    constructor(protected adminService: AdminService) { }

    @Action(AdminActions.RecalculateMaterialComments)
    onRecalculateMaterialComments(context: StateContext<AdminStateModel>) {
        return this.adminService.recalculateMaterialComments();       
    }  

    @Action(AdminActions.RecalculateUsersNumbers)
    onRecalculateUsersNumbers(context: StateContext<AdminStateModel>) {
        return this.adminService.recalculateUsersNumbers();       
    }  

    @Action(AdminActions.UpdateMaterialCommentsCount)
    onUpdateMaterialCommentsCount({patchState}: StateContext<AdminStateModel>, { payload }: AdminActions.UpdateMaterialCommentsCount) {        
        patchState({materialsNumbers: payload});               
    }

    @Action(AdminActions.UpdateUsersNumbersCount)
    onUpdateUsersNumbersCount({patchState}: StateContext<AdminStateModel>, { payload }: AdminActions.UpdateMaterialCommentsCount) {        
        patchState({usersNumbers: payload});               
    }
}