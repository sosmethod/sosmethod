import {NgModule,} from '@angular/core';
import {FormsModule,} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, Http} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {ComponentsModule} from './components';
import {NavigationModule} from './components/navigation/navigation.module';

import {AppComponent} from './app.component';

// errors
import {NotFoundPageComponent} from './error/404/not-found';
import {NotAuthorizedPageComponent} from './error/401/not-authorized';

// account
import {AccountLoginPageComponent} from './components/account/login/login';
import {AccountRegisterPageComponent} from './components/account/register/register';
import {AccountConfirmPageComponent} from './components/account/confirm/confirm';
import {ForgotPassword2Component} from './components/account/reset/reset';
import {ForgotPasswordPageComponent} from './components/account/forgot/forgot';
import {ResendCodeComponent} from './components/account/resend/resend';

// auth services
import {LayoutService} from './services/layout';
import {AuthService} from './services/auth.service';

// translation service
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';

import {CanActivateTeam} from './guards/secure';
import {routes} from './app.routing';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        MaterialModule,

        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        RouterModule.forRoot(routes, {useHash: true}),

        ComponentsModule,
        NavigationModule
    ],
    declarations: [
        AppComponent,
        AccountLoginPageComponent,
        NotFoundPageComponent,
        ResendCodeComponent,
        ForgotPassword2Component,
        ForgotPasswordPageComponent,
        AccountLoginPageComponent,
        AccountRegisterPageComponent,
        AccountConfirmPageComponent,
        NotAuthorizedPageComponent,
    ],
    providers: [
        TranslateService,
        CanActivateTeam,
        LayoutService,
        AuthService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
