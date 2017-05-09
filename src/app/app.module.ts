import {NgModule} from '@angular/core';
import {Http} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

// sos modules
import {LayoutModule} from './layout/layout.module';
import {DialogModule} from './dialogs/dialogs.module';
import {MenusModule} from './menus/menus.module';
import {PlayerModule} from './player/player.module';
import {PagesModule} from './pages/pages.module';

import {AppComponent} from './app.component';

// errors
import {NotFoundComponent} from './error/404/not-found';
import {NotAuthorizedComponent} from './error/401/not-authorized';

// translation service
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {routing} from './app.routing';
import {COMMON_MODULES, SharedModule} from './shared/common.module';
import {AuthGuard} from "./dialogs/+auth/auth-guard";
import {DialogGuard} from "./dialogs/dialog-guard";

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const FirebaseConfig: FirebaseAppConfig = {
    apiKey: 'AIzaSyCqhdstV83rISzeWGyJy0DDhdeBAByWxtU',
    authDomain: 'sosmethod-36e55.firebaseapp.com',
    databaseURL: 'https://sosmethod-36e55.firebaseio.com',
    storageBucket: 'sosmethod-36e55.appspot.com',
    messagingSenderId: '216534622213'
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        ...COMMON_MODULES,

        AngularFireModule.initializeApp(FirebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        routing,

        PagesModule,
        DialogModule,

        LayoutModule,
        MenusModule,
        PlayerModule
    ],
    exports: [RouterModule, SharedModule, AppComponent],
    declarations: [
        AppComponent,
        NotFoundComponent,
        NotAuthorizedComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
