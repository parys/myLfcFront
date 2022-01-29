import { Component, HostListener, PLATFORM_ID, Inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { SidebarLeftActions, SidebarLeftState } from '@lazy-modules/sidebar-left/store';
import { Observable } from 'rxjs';
import { Match } from '@domain/models';

@Component({
    selector: 'sidebar-left',
    templateUrl: './sidebar-left.component.html',
    styleUrls: ['./sidebar-left.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLeftComponent {

    constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: object) {
        this.store.dispatch([
            new SidebarLeftActions.GetCalendar()]);
    }

    @Select(SidebarLeftState.nextMatch) nextMatch$: Observable<Match>;
    @Select(SidebarLeftState.lastMatch) lastMatch$: Observable<Match>;

    @HostListener('window:scroll', [])
    public onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            document.getElementById('goToTop').className = scrollPos >= 200 ? '' : 'hidden';
        }
    }

    public goToTop(): void {
        scrollTo(0, 0);
    }
}
