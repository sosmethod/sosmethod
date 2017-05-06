import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {AccountLoginComponent} from './login/login';
import {AccountRegisterComponent} from './register/register';
import {AccountConfirmComponent} from './confirm/confirm';
import {ResetPasswordComponent} from './reset/reset';
import {ForgotPasswordComponent} from './forgot/forgot';

import {routing} from './auth.routing';
import {AccountProfileComponent} from './profile/profile';
import {MaterialModule, MdCard, MdIcon} from '@angular/material';
import {SubscriptionComponent} from './profile/subscription';
import {DiscoveryTimelineComponent} from './profile/discovery-timeline';
import {MeditationTimelineComponent} from './profile/meditation-timeline';
import {COMMON_MODULES} from '../../shared/common.module';


export const COMPONENTS = [
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
    exports: COMPONENTS
})
export class AuthModule {
}


