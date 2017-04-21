import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode, NgModuleRef} from '@angular/core';
import { environment } from '../config/environment';
import {AppModule} from './app/app.module';
export { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

export const boostrap = platformBrowserDynamic().bootstrapModule(AppModule);

