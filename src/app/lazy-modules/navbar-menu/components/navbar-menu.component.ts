import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'class': 'navbar-menu'}
})
export class NavbarMenuComponent {

    constructor() {
    }
}
