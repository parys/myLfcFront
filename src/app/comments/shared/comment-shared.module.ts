import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';

import { EditorModule } from '@editor/index';
import { PipesModule } from '@base/pipes';

import { CommentService } from '@comments/comment.service';
import { CommentDetailComponent } from '@comments/shared/comment-detail';
import { CommentSectionComponent } from '@comments/shared/comment-section';
import { OdModule } from '@od/od.module';
import { NgxsModule } from '@ngxs/store';
import { CommentsState } from './store';

@NgModule({
    imports: [
        CommonModule,
        EditorModule,
        RouterModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        OdModule,
        NgxsModule.forFeature([CommentsState])
    ],
    declarations: [
        CommentDetailComponent,
        CommentSectionComponent
    ],
    exports: [
        CommentSectionComponent,
        CommentDetailComponent
    ],
    providers: [
        CommentService
    ]
})
export class CommentSharedModule { }
