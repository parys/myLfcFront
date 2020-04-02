import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { PipesModule } from '@base/pipes';
import { MobileLayoutModule } from '@layout/modules/mobile-layout/mobile-layout.module';

import { MaterialCoreService } from '@materials/core/material-core.service';
import { MaterialHomeComponent } from '@materials/core/material-home';
import { MaterialItemComponent } from '@materials/core/material-item';
import { MaterialToolsComponent } from './components/material-tools';
import { MaterialsState } from '@materials/lazy/store';
import { MaterialService } from '@materials/lazy/material.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MobileLayoutModule,
        PipesModule,
        NgxsModule.forFeature([MaterialsState])
    ],
    declarations: [
        MaterialHomeComponent,
        MaterialItemComponent,
        MaterialToolsComponent
    ],
    exports: [
        MaterialToolsComponent
    ],
    providers: [
        MaterialCoreService,
        MaterialService // todo need for store
    ]
})
export class MaterialCoreModule { }
