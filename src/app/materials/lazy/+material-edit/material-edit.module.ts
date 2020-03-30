import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageCoreModule } from '@images/core';
import { EditorModule } from '@editor/editor.module';
import { MaterialCategoryCoreModule } from '@material-categories/core';

import { MaterialEditComponent } from '@materials/lazy/+material-edit/pages/material-edit.component';
import { materialEditRoutes } from '@materials/lazy/+material-edit/material-edit.routes';
import { MaterialLeaveGuard } from './leave-guard/leave-guard.service';
import { MaterialEditMaterialModule } from './material-edit-material.module';
import { MaterialEditService } from './materials-edit.service';
import { NgxsModule } from '@ngxs/store';
import { MaterialsState } from '../store';
import { MaterialResolver } from '../resolvers';
import { MaterialCategoriesState } from '@material-categories/core/store';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(materialEditRoutes),
        EditorModule,
        MaterialCategoryCoreModule,
        ImageCoreModule,
        MaterialEditMaterialModule,
        NgxsModule.forFeature([MaterialsState, MaterialCategoriesState])
    ],
    declarations: [
        MaterialEditComponent,
    ],
    providers: [
        MaterialLeaveGuard,
        MaterialEditService,
        MaterialResolver
    ]
})
export class MaterialEditModule { }
