import {NgModule} from '@angular/core';
import {Http} from '@angular/http';

import {LayoutModule} from './layout/layout.module';
import {AuthModule} from './dialogs/auth/auth.module';

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

import {AuthGuard} from './dialogs/auth/auth-guard';
import {DialogGuard} from './dialogs/dialog-guard';
import {routing} from './app.routing';
import {AudioService} from './services/audio.service';
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {environment} from '../../config/environment';
import {ContentGuard} from './menus/content-guard';
import {COMMON_MODULES} from './shared/common.module';
import {AsyncPipe} from '@angular/common';
import {SignupModule} from "./pages/signup.module";
import {GiftModule} from "./pages/gift.module";
import {DialogModule} from "./dialogs/dialogs.module";
import {MenusModule} from "./menus/menus.module";
import {PlayerModule} from "./player/player.module";
import {ToolsModule} from "./dialogs/tools.module";
import {SurveyModule} from "./dialogs/survey.module";
import {BonusModule} from "./dialogs/bonus.module";

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};

@NgModule({
    imports: [
        ...COMMON_MODULES,

        AngularFireModule.initializeApp(environment.firebase, myFirebaseAuthConfig),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        routing,

        AuthModule,
        LayoutModule,
        SignupModule,
        GiftModule,
        DialogModule,
        MenusModule,
        PlayerModule,
        ToolsModule,
        SurveyModule,
        BonusModule
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
