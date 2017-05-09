import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode, NgModuleRef} from '@angular/core';
import { environment } from '../config/environment';
import { environment as prodEnvironment } from '../config/environment.prod';
import {AppModule} from './app/app.module';
import {Environment} from '../config/environment.i';
export { AppModule } from './app/app.module';

if (environment.production) {
  Environment.env = prodEnvironment;
  enableProdMode();
} else {
  Environment.env = environment;
}
export const boostrap = platformBrowserDynamic().bootstrapModule(AppModule);

