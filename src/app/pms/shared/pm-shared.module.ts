import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { EditorModule } from '@editor/index';

import { PmService } from '@pms/pm.service';
import { PmReplyComponent } from '@pms/shared/pm-reply';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        PmReplyComponent
    ],
    exports: [
        PmReplyComponent
    ],
    providers: [
        PmService
    ]
})
export class PmSharedModule { }
