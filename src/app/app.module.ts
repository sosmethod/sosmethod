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
import {DialogModule} from './+dialogs/dialogs.module';
import {PagesModule} from './+pages/pages.module';
import {PlayModule} from './+player/play.module';
import {MenuModule} from './+menus/menu.module';
import {AppComponent} from './app.component';

// translation service
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {routing} from './app.routing';
import {SharedModule, sharedModules} from './shared/shared.module';
import {PlatformModule} from '@angular/material';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const FirebaseConfig: FirebaseAppConfig = {
    apiKey: 'AIzaSyCqhdstV83rISzeWGyJy0DDhdeBAByWxtU',
    authDomain: 'sosmethod.io',
    databaseURL: 'https://sosmethod-36e55.firebaseio.com',
    storageBucket: 'sosmethod-36e55.appspot.com',
    messagingSenderId: '216534622213'
};

@NgModule({
    imports: [
        PlatformModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        ...sharedModules,

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

        // lazy
        PagesModule,
        DialogModule,
        PlayModule,
        MenuModule,

        // shared
        LayoutModule,
    ],
    exports: [RouterModule, SharedModule, AppComponent],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
