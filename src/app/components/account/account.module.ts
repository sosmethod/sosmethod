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
import {ResendCodeComponent} from './resend/resend';

import { routing } from './account.routing';
import {AccountProfileComponent} from "./profile/profile";
import {MaterialModule, MdCard, MdIcon} from "@angular/material";
import {SubscriptionComponent} from "./profile/subscription";
import {DiscoveryTimelineComponent} from "./profile/discovery-timeline";
import {MeditationTimelineComponent} from "./profile/meditation-timeline";


export const COMPONENTS = [
    AccountLoginComponent,
    ResendCodeComponent,
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
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        routing,
        MaterialModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class AccountModule {
}


