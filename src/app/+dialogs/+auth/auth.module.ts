import {NgModule} from '@angular/core';

import {AccountLoginComponent} from './login/login';
import {AccountRegisterComponent} from './register/register';
import {AccountConfirmComponent} from './confirm/confirm';
import {ResetPasswordComponent} from './reset/reset';
import {ForgotPasswordComponent} from './forgot/forgot';

import {routing} from './auth.routing';
import {AccountProfileComponent} from './profile/profile';
import {SubscriptionComponent} from './profile/subscription';
import {DiscoveryTimelineComponent} from './profile/discovery-timeline';
import {MeditationTimelineComponent} from './profile/meditation-timeline';
import {COMMON_MODULES} from '../../shared/shared.module';
import {DialogGuard} from '../dialog-guard';
import {SurveyProfileComponent} from '../+survey/survey-profile';

export const COMPONENTS = [
    SurveyProfileComponent,
    AccountLoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AccountRegisterComponent,
    AccountConfirmComponent,
    AccountProfileComponent,
    SubscriptionComponent,
    DiscoveryTimelineComponent,
    MeditationTimelineComponent
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [DialogGuard]
})
export class AuthModule {
}


