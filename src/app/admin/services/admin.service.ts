import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { ADMIN_ROUTE } from '@constants/routes.constants';


@Injectable()
export class AdminService {
    private actionUrl: string = ADMIN_ROUTE + '/';

    constructor(public http: HttpWrapper) {
    }

    public recalculateMaterialComments(): Observable<any> {
        return this.http.put(this.actionUrl + 'RecalculateMaterialComments', {});
    }

    public recalculateUsersNumbers(): Observable<any> {
        return this.http.put(this.actionUrl + 'recalculateUsersNumbers', {});
    }

    public calculateCommentVotes(): Observable<any> {
        return this.http.put(this.actionUrl + 'calculateCommentVotes', {});
    }

    public calculateCommentsNumber(): Observable<any> {
        return this.http.put(this.actionUrl + 'calculateCommentsNumber', {});
    }

    public sendTestEmail(email: string): Observable<any> {
        return this.http.put(this.actionUrl + 'sendTestEmail', {email: email});
    }
}