import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { NgxsModule } from '@ngxs/store';

import { MatchHeaderComponent } from './components/match-header.component';
import { PipesModule } from '@base/pipes';
import { MatchHeaderService } from './match-header.service';
import { MatchHeaderState } from './store';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        MatIconModule,
        NgxsModule.forFeature([MatchHeaderState])
    ],
    declarations: [
        MatchHeaderComponent
    ],
    providers: [
        MatchHeaderService
    ],
    entryComponents: [
        MatchHeaderComponent
    ]
})
export class MatchHeaderModule {

    getComponent() {
        return MatchHeaderComponent;
    }
}
