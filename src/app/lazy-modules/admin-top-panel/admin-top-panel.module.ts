import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminTopPanelComponent } from './components/admin-top-panel.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        AdminTopPanelComponent
    ]
})
export class AdminTopPanelModule {
    getComponent() {
        return AdminTopPanelComponent;
    }
}
