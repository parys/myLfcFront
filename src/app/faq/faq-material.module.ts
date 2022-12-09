import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

const materialModules = [
    MatExpansionModule,
    MatButtonModule
];

@NgModule({
    imports: [
        CommonModule,
        ...materialModules
    ],
    exports: [
        ...materialModules
    ]
})
export class FaqMaterialModule {
}
