import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppModuleShared } from './app.module';


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        AppModuleShared,
        NoopAnimationsModule,
        ServerModule,
    ]
})
export class AppServerModule {
}
