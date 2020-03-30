import { NgModule } from '@angular/core';

import { MaterialCategoryService } from './materialCategory.service';
import { NgxsModule } from '@ngxs/store';
import { MaterialCategoriesState } from './store';

@NgModule({
    imports: [
        NgxsModule.forFeature([MaterialCategoriesState])
    ],
    providers: [
        MaterialCategoryService
    ]
})
export class MaterialCategoryCoreModule { }
