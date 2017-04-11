import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../guards/auth';


import { ResendCodeComponent } from './resend/resend';
import { AccountLoginComponent } from './login/login';
import { AccountRegisterComponent } from './register/register';
import { AccountConfirmComponent } from './confirm/confirm';
import { ForgotPassword2Component } from './reset/reset';
import { ForgotPasswordComponent } from './forgot/forgot';
import { LogoutComponent } from './logout/logout';
import {DialogGuard} from "../../guards/dialog";


export const accountRoutes: Routes = [
    {
        path: 'account',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
//            { path: 'about', component: AboutComponent },
            { path: 'logout', component: LogoutComponent, data: {roles: ['anonymous', 'user']} },
            { path: 'login', component: AccountLoginComponent },
            { path: 'register', component: AccountRegisterComponent },
            { path: 'confirm/:username', component: AccountConfirmComponent },
            { path: 'resend', component: ResendCodeComponent },
            { path: 'reset/:email', component: ForgotPassword2Component },
            { path: 'forgot', component: ForgotPasswordComponent },
            { path: '', component: AccountLoginComponent }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(accountRoutes);

