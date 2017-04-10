import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, Http} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {ComponentsModule} from './components';
import {NavigationModule} from './components/navigation/navigation.module';
import {AccountModule} from './components/account/account.module';

import {AppComponent} from './app.component';

// errors
import {NotFoundComponent} from './error/404/not-found';
import {NotAuthorizedComponent} from './error/401/not-authorized';

// auth services
import {LayoutService} from './services/layout';
import {AuthService} from './services/auth.service';

// translation service
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';

import {AuthGuard} from './guards/auth';
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
        AuthGuard,
        LayoutService,
        AuthService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
