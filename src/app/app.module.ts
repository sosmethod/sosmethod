import {NgModule} from '@angular/core';
import {Http} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig} from 'angularfire2';

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

// auth services
import {LayoutService} from './services/layout';
import {AudioService} from './services/audio.service';

// translation service
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';

// guards
import {ContentGuard} from './menus/content-guard';
import {AuthGuard} from './dialogs/+auth/auth-guard';
import {DialogGuard} from './dialogs/dialog-guard';

import {routing} from './app.routing';
import {environment} from '../../config/environment';
import {COMMON_MODULES} from './shared/common.module';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};

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
        ...COMMON_MODULES,

        AngularFireModule.initializeApp(FirebaseConfig, myFirebaseAuthConfig),
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
    exports: [RouterModule],
    declarations: [
        AppComponent,
        NotFoundComponent,
        NotAuthorizedComponent,
    ],
    providers: [
        TranslateService,
        AudioService,
        AuthGuard,
        DialogGuard,
        ContentGuard,
        LayoutService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
