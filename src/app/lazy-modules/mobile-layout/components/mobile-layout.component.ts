import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MatSidenav } from '@angular/material/sidenav';
import { CoreActions, CoreState } from '@core/store';
import { ObserverComponent } from '@domain/base';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

//import { Match } from '@domain/models/match.model';
//import { MatchHeaderState, GetHeaderMatch } from '../store';

@Component({
    selector: 'mobile-layout',
    templateUrl: './mobile-layout.component.html',
    styleUrls: ['./mobile-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MobileLayoutComponent extends ObserverComponent {

    @ViewChild('sidenav') sidenav: MatSidenav;

   @Select(CoreState.menuOpened) menuOpened$: Observable<boolean>;

    constructor(private router: Router, private store: Store) {
        super();
   //     this.store.dispatch(new GetHeaderMatch());
        const sub$ = this.menuOpened$.subscribe(x => x ? this.sidenav?.open() : this.sidenav?.close());
        this.subscriptions.push(sub$);

        const sub2$ =this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd),
            map(() => this.onCloseMenu())).subscribe();
        this.subscriptions.push(sub2$);
    }

    public onCloseMenu(): void {
        this.store.dispatch(new CoreActions.CloseMenu());
    }
}
