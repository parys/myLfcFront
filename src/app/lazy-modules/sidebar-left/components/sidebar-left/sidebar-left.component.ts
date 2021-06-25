import { Component, HostListener, PLATFORM_ID, Inject, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'sidebar-left',
    templateUrl: './sidebar-left.component.html',
    styleUrls: ['./sidebar-left.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLeftComponent {
    @HostListener('window:scroll', [])
    public onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            document.getElementById('goToTop').className = scrollPos >= 200 ? '' : 'hidden';
        }
    }
    constructor(@Inject(PLATFORM_ID) private platformId: object) {
    }

    public goToTop(): void {
        scrollTo(0, 0);
    }
}
