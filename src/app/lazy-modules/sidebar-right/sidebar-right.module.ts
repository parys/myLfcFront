import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChatModule } from '@chat/chat.module';
import { AccountSigninWidgetModule } from '@widgets/http/account-signin-widget';

import { RightSidebarMaterialModule } from './sidebar-right-material.module';

import { PipesModule } from '@base/pipes';
import { SidebarRightService } from './sidebar-right.service';
import { DynamicContentOutletModule } from '@layout/dynamic-content-outlet/dynamic-content-outlet.module';
import { NgxsModule } from '@ngxs/store';
import { RightSidebarState } from './store';
import { UserBirthdayComponent } from './components/user-birthday';
import { UserOnlineCounterComponent } from './components/user-online-counter';
import { CommentLastComponent } from './components/comment-last';
import { SidebarRightComponent } from './components/sidebar-right';
import { ILazyModule } from '@layout/ilazy-module.interface';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RightSidebarMaterialModule,
        ChatModule,
        AccountSigninWidgetModule,
        PipesModule,
        DynamicContentOutletModule,
        NgxsModule.forFeature([RightSidebarState])
    ],
    declarations: [
        UserBirthdayComponent,
        UserOnlineCounterComponent,
        CommentLastComponent,
        SidebarRightComponent
    ],
    providers: [
        SidebarRightService
    ],
    bootstrap: [
        SidebarRightComponent
    ]
})
export class SidebarRightModule implements ILazyModule {
    getComponent() {
      return SidebarRightComponent;
    }
 }
