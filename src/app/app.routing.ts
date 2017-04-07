import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './error/404/not-found';
import { NotAuthorizedPageComponent } from './error/401/not-authorized';
import { ResendCodeComponent } from './components/account/resend/resend';

import { AccountLoginPageComponent } from './components/account/login/login';
import { AccountRegisterPageComponent } from './components/account/register/register';
import { AccountConfirmPageComponent } from './components/account/confirm/confirm';
import { ForgotPassword2Component } from './components/account/reset/reset';
import { ForgotPasswordPageComponent } from './components/account/forgot/forgot';

import { CanActivateTeam } from './guards/secure';

import { AppComponent } from './app.component';
import {MainComponent} from './components/navigation/main/main';

const homeRoutes: Routes = [
    {
        path: '',
        canActivate: [CanActivateTeam],
        canActivateChild: [CanActivateTeam],
        children: [
//            { path: 'about', component: AboutComponent },
            { path: 'account/login', component: AccountLoginPageComponent },
            { path: 'account/register', component: AccountRegisterPageComponent },
            { path: 'account/confirm/:username', component: AccountConfirmPageComponent },
            { path: 'account/resend', component: ResendCodeComponent },
            { path: 'account/reset/:email', component: ForgotPassword2Component },
            { path: 'account/forgot', component: ForgotPasswordPageComponent },
            { path: '', component: MainComponent }
        ]
    },
];

const secureHomeRoutes: Routes = [
    {
        path: 'home',
        canActivate: [CanActivateTeam],
        canActivateChild: [CanActivateTeam],
        children: [
        ]
    }
];

export const routes: Routes = [
    {
        path: '',
        children: [
            ...homeRoutes,
            ...secureHomeRoutes,
            {
                path: '',
                component: AppComponent
            }
        ]
    },
    {
        path: '**error400',
        component: NotAuthorizedPageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    },

];


