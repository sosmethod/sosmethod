import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../../pipes';
import {TranslateModule} from '@ngx-translate/core';

import {AccountLoginComponent} from './login/login';
import {AccountRegisterComponent} from './register/register';
import {AccountConfirmComponent} from './confirm/confirm';
import {ForgotPassword2Component} from './reset/reset';
import {ForgotPasswordComponent} from './forgot/forgot';
import {ResendCodeComponent} from './resend/resend';
import {LogoutComponent} from './logout/logout';

import { routing } from './account.routing';


export const COMPONENTS = [
    AccountLoginComponent,
    LogoutComponent,
    ResendCodeComponent,
    ForgotPassword2Component,
    ForgotPasswordComponent,
    AccountRegisterComponent,
    AccountConfirmComponent
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        PipesModule,
        TranslateModule,
        FormsModule,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class AccountModule {
}


