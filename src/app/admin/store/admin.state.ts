import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { AdminStateModel } from './admin.model';
import { AdminActions } from './admin.actions';
import { AdminService } from '@admin/services/admin.service';
import { NoticeMessage, NoticeType } from '@notices/shared';
import { ShowNotice } from '@notices/store';


@State<AdminStateModel>({
    name: 'admin',
    defaults: {
        materialsNumbers: null,
        usersNumbers: null,
        commentsVotes: null
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

    @Selector()
    static commentsVotes(state: AdminStateModel) {
        return state.commentsVotes;
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

    @Action(AdminActions.CalculateCommentVotes)
    onCalculateCommentVotes(context: StateContext<AdminStateModel>) {
        return this.adminService.calculateCommentVotes();       
    }    

    @Action(AdminActions.CalculateCommentsNumber)
    onCalculateCommentsNumber(context: StateContext<AdminStateModel>) {
        return this.adminService.calculateCommentsNumber()
            .pipe(tap(a => 
                context.dispatch(new ShowNotice(new NoticeMessage(NoticeType.Success, "Комментарии обновлены")))));       
    }  

    @Action(AdminActions.UpdateMaterialCommentsCount)
    onUpdateMaterialCommentsCount({patchState}: StateContext<AdminStateModel>, { payload }: AdminActions.UpdateMaterialCommentsCount) {        
        patchState({materialsNumbers: payload});               
    }

    @Action(AdminActions.UpdateUsersNumbersCount)
    onUpdateUsersNumbersCount({patchState}: StateContext<AdminStateModel>, { payload }: AdminActions.UpdateMaterialCommentsCount) {        
        patchState({usersNumbers: payload});               
    }

    @Action(AdminActions.UpdateCommentVotes)
    onUpdateCommentVotes({patchState}: StateContext<AdminStateModel>, { payload }: AdminActions.UpdateCommentVotes) {        
        patchState({commentsVotes: payload});               
    }
    
    @Action(AdminActions.SendTestEmail)
    onSendTestEmail(context: StateContext<AdminStateModel>, { payload }: AdminActions.SendTestEmail) {        
        return this.adminService.sendTestEmail(payload)
            .pipe(tap(a => 
                context.dispatch(new ShowNotice(new NoticeMessage(NoticeType.Success, "Тестовое письмо успешно отправлено")))));       
   
    }
}
