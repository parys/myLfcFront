import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { NgxsModule } from '@ngxs/store';

import { MobileLayoutComponent } from './components/mobile-layout.component';
import { PipesModule } from '@base/pipes';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DynamicContentOutletModule } from '@layout/dynamic-content-outlet/dynamic-content-outlet.module';
//import { MatchHeaderService } from './match-header.service';
//import { MatchHeaderState } from './store';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        MatIconModule,
        MatSidenavModule,
        DynamicContentOutletModule,
 //       NgxsModule.forFeature([MatchHeaderState])
    ],
    declarations: [
        MobileLayoutComponent
    ],
    // providers: [
    //     MatchHeaderService
    // ],
    // entryComponents: [
    //     MatchHeaderComponent
    // ]
})
export class MobileLayoutModule {
    static dynamicComponentsMap = {
        MobileLayoutComponent
    };
}
