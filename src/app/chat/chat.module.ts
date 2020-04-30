import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxsModule } from '@ngxs/store';

import { EditorModule } from '@editor/editor.module';
import { PipesModule } from '@base/pipes';
import { BreadcrumbService } from '@base/breadcrumbs';

import { MiniChatComponent } from '@chat/miniChat';
import { MaxiChatComponent } from '@chat/maxiChat';
import { ChatWindowComponent } from '@chat/chat-window';
import { chatRoutes } from '@chat/chat.routes';
import { ChatMessageService } from '@chat/chat-message.service';
import { ChatState } from '@chat/store';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(chatRoutes),
        EditorModule,
        PipesModule,
        MatButtonModule,
        MatTabsModule,
        NgxsModule.forFeature([ChatState])
    ],
    declarations: [
        MiniChatComponent,
        MaxiChatComponent,
        ChatWindowComponent
    ],
    exports: [
        MiniChatComponent,
        MaxiChatComponent,
        ChatWindowComponent
    ],
    providers: [
        ChatMessageService
    ]
})
export class ChatModule {
    constructor(
        breadcrumbService: BreadcrumbService
    ) {
        breadcrumbService.addFriendlyNameForRoute('/chat', 'Чат');
    }
 }
