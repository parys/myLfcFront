import { NgModule } from '@angular/core';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { NavbarMenuComponent } from './components/navbar-menu.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [
        NavbarMenuComponent,
    ]
})
export class NavbarMenuModule {
    static dynamicComponentsMap = {
        NavbarMenuComponent
    };
 }
