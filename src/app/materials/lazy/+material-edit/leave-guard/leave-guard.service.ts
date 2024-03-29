﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MaterialEditComponent } from '../pages/material-edit.component';

@Injectable()
export class MaterialLeaveGuard  {
    canDeactivate(
        component: MaterialEditComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

        // or, you can also handle the guard asynchronously, e.g.
        // asking the user for confirmation.
        return component.showLeaveModal();
    }
}
