import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { Blob } from 'blob-polyfill';

if (environment.production) {
  enableProdMode();
}
global.Blob = Blob;

export { AppServerModule } from './app/app.module.server';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { renderModule } from '@angular/platform-server';
