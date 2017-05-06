import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth-guard';


import {AccountLoginComponent} from './login/login';
import {AccountRegisterComponent} from './register/register';
import {AccountConfirmComponent} from './confirm/confirm';
import {ResetPasswordComponent} from './reset/reset';
import {ForgotPasswordComponent} from './forgot/forgot';
import {DialogGuard} from '../dialog-guard';
import {AccountProfileComponent} from './profile/profile';


export const accountRoutes: Routes = [
    {
        path: 'account',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
            {path: 'login', component: AccountLoginComponent},
            {path: 'register', component: AccountRegisterComponent},
            {path: 'confirm/:username', component: AccountConfirmComponent},
            {path: 'reset', component: ResetPasswordComponent},
            {path: 'forgot', component: ForgotPasswordComponent},
            {path: 'profile', component: AccountProfileComponent}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(accountRoutes);

