import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { NavbarMenuComponent } from './components/navbar-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { ILazyModule } from '@layout/ilazy-module.interface';

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
    ],
    entryComponents: [
        NavbarMenuComponent,
    ]
})
export class NavbarMenuModule implements ILazyModule {

    getComponent() {
        return NavbarMenuComponent;
    }
}
