import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, Http} from '@angular/http';
import {NguiScrollableModule} from '@ngui/scrollable';

import {ComponentsModule} from './components';
import {NavigationModule} from './components/navigation/navigation.module';
import {AccountModule} from './components/account/account.module';

import {AppComponent} from './app.component';

// errors
import {NotFoundComponent} from './error/404/not-found';
import {NotAuthorizedComponent} from './error/401/not-authorized';

// auth services
import {LayoutService} from './services/layout';

// translation service
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';

import {AuthGuard} from './guards/auth';
import {DialogGuard} from './guards/dialog';
import {routes} from './app.routing';
import {AudioService} from './services/audio';
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {environment} from '../../config/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {ContentGuard} from './guards/content';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase, myFirebaseAuthConfig),
        NguiScrollableModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        RouterModule.forRoot(routes, {useHash: true}),

        AccountModule,
        ComponentsModule,
        NavigationModule
    ],
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
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
