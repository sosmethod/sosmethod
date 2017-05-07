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
        path: 'login',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: AccountLoginComponent
    },
    {
        path: 'register',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: AccountRegisterComponent
    },
    {
        path: 'confirm/:username',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: AccountConfirmComponent
    },
    {
        path: 'reset',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ResetPasswordComponent
    },
    {
        path: 'forgot',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ForgotPasswordComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: AccountProfileComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(accountRoutes);

