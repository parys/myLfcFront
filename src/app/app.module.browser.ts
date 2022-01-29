import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { environment } from '@environments/environment';
import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';
import { SignalRModule } from '@base/signalr';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        AppModuleShared,
        BrowserAnimationsModule,
     //   BrowserTransferStateModule,
        SignalRModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        }),
        NgxsLoggerPluginModule.forRoot({
            disabled: environment.production
        }),
    ]
})
export class AppModule {
}
