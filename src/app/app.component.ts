import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ChangeDetectionStrategy,
    PLATFORM_ID,
    Inject
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { CoreActios, CoreState } from '@core/store';

import { CustomTitleMetaService } from '@core/services';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ObserverComponent } from '@domain/base';
import { isPlatformServer } from '@angular/common';
import { AuthState } from '@auth/store/auth.state';
import { UpdateService } from '@base/update.service';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends ObserverComponent implements OnInit {

    @Select(CoreState.mobile) mobile$: Observable<boolean>;
    @Select(AuthState.isAuthor) isAuthor$: Observable<boolean>;
    @Select(AuthState.isNewsmaker) isNewsmaker$: Observable<boolean>;

    @ViewChild('sidenav') sidenav: MatSidenav;

    public showAd = true;

    constructor(private router: Router,
                private updateService: UpdateService,
                private activatedRoute: ActivatedRoute,
                private titleService: CustomTitleMetaService,
                private store: Store,
                @Inject(PLATFORM_ID) private platformId: object,
                private breakpointObserver: BreakpointObserver
    ) {
        super();
        this.subscribeOnChangeLayout();
    }

    public ngOnInit(): void {
        this.initTitleSubscriber();
    }

    public onAdClose(element: any): void {
        this.showAd = false;
        element.srcElement.parentElement.remove();
    }

    private initTitleSubscriber() {
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd),
            map(() => {
                let child = this.activatedRoute.firstChild;
                this.sidenav?.close();
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else {
                        return child.snapshot.data;
                    }
                }
                return null;
            })).subscribe((data: any) => {
                if (data?.title) {
                    this.titleService.setTitle(data.title);
                    this.titleService.updateKeywordsMetaTag(data.keywords || '');
                    this.titleService.updateDescriptionMetaTag(data.description || '');
                    this.titleService.updateTypeMetaTag(data.ogType || 'website');
                    this.titleService.updateOgImageMetaTag('https://mylfc.ru/content/logo34.png');
                }
            });
    }

    private subscribeOnChangeLayout(): void {
        if (isPlatformServer(this.platformId)) { return; }
        const subscription = this.breakpointObserver.observe(['screen and (max-width: 767px)'])
            .pipe(
                map((x: BreakpointState) => x.matches),
                distinctUntilChanged()
            )
            .subscribe((mobile: boolean) => {
                this.store.dispatch(new CoreActios.ChangeMobile(mobile));
            });

        this.subscriptions.push(subscription);
    }
}
