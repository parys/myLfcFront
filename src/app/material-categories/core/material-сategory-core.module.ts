import { NgModule } from '@angular/core';

import { MaterialCategoryService } from './material-сategory.service';
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
