import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

import { PmCounterComponent } from './components/pm-counter';
import { NotificationCounterComponent } from './components/notification-counter';
import { ProfileCountersService } from './services/profile-counters.service';
import { NgxsModule } from '@ngxs/store';
import { CountersState } from './store';
import { CountersComponent } from './components/counters';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatBadgeModule,
        MatIconModule,
        NgxsModule.forFeature([CountersState])
    ],
    declarations: [
        PmCounterComponent,
        NotificationCounterComponent,
        CountersComponent
    ],
    providers: [
        ProfileCountersService
    ],
    entryComponents: [
        CountersComponent
    ]
})
export class ProfileCountersModule {
    static dynamicComponentsMap = {
        CountersComponent
    };
 }
