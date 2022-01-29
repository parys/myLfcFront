import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { LazyLoadingModuleService } from '@editor/lazy-loading-module.service';
import { SidebarLeftService } from '@lazy-modules/sidebar-left/sidebar-left.service';
import { DynamicContentOutletErrorComponent } from './dynamic-content-outlet-error.component';
import { DynamicContentOutletComponent } from './dynamic-content-outlet.component';
import { DynamicContentOutletService } from './dynamic-content-outlet.service';

@NgModule({
  imports: [CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatMenuModule,
      MatDialogModule
    ],
  declarations: [
    DynamicContentOutletComponent,
    DynamicContentOutletErrorComponent
  ],
  exports: [DynamicContentOutletComponent],
  providers: [
    DynamicContentOutletService,
    SidebarLeftService,
    LazyLoadingModuleService
  ],
  entryComponents: [
    DynamicContentOutletComponent,
    DynamicContentOutletErrorComponent
  ]
})
export class DynamicContentOutletModule {

}
