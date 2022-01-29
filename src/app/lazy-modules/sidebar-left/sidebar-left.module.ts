import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
    SidebarLeftComponent,
    EplTableComponent,
    MatchCalendarComponent,
    MatchCalendarEntryComponent,
    PersonBirthdayComponent,
    BestPlayerComponent,
    InjuryCurrentListComponent,
    CupTableComponent
} from './components';
import { LeftSidebarMaterialModule } from './sidebar-left-material.module';
import { SidebarLeftService } from './sidebar-left.service';
import { PipesModule } from '@base/pipes';
import { NgxsModule } from '@ngxs/store';
import { ILazyModule } from '@layout/ilazy-module.interface';
import { DynamicContentOutletModule } from '@layout/dynamic-content-outlet/dynamic-content-outlet.module';
import { SidebarLeftState } from './store/sidebar-left.state';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LeftSidebarMaterialModule,
        PipesModule,
        DynamicContentOutletModule,
        NgxsModule.forFeature([SidebarLeftState])
    ],
    declarations: [
        MatchCalendarComponent,
        BestPlayerComponent,
        MatchCalendarEntryComponent,
        PersonBirthdayComponent,
        InjuryCurrentListComponent,
        CupTableComponent,
        EplTableComponent,
        SidebarLeftComponent
    ],
    providers: [
        SidebarLeftService
    ],
    bootstrap: [
        SidebarLeftComponent
    ]
})
export class SidebarLeftModule implements ILazyModule {
  getComponent() {
    return SidebarLeftComponent;
  }
}
