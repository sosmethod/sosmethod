import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './error/404/not-found';
import { NotAuthorizedPageComponent } from './error/401/not-authorized';
import { ResendCodeComponent } from './components/account/resend/resend';

import { AccountLoginPageComponent } from './components/account/login/login';
import { AccountRegisterPageComponent } from './components/account/register/register';
import { AccountConfirmPageComponent } from './components/account/confirm/confirm';
import { ForgotPassword2Component } from './components/account/reset/reset';
import { ForgotPasswordPageComponent } from './components/account/forgot/forgot';
import { SecureHomeComponent } from './components/funnel/home/home';
import { LogoutComponent } from './components/funnel/logout/logout';
import { SubscriptionsAddComponent } from './components/funnel/subscriptions-add/subscriptions-add';
import { SubscriptionsComponent } from './components/funnel/subscriptions/subscriptions';

import { CanActivateTeam } from './guards/secure';

import { AppComponent } from './app.component';

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
            { path: '', component: AccountLoginPageComponent }
        ]
    },
];

const secureHomeRoutes: Routes = [
    {
        path: 'home',
        canActivate: [CanActivateTeam],
        canActivateChild: [CanActivateTeam],
        children: [
            { path: 'subscriptions-add/:product', component: SubscriptionsAddComponent },
            { path: 'logout', component: LogoutComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
//            { path: 'myprofile', component: MyProfileComponent },
//            { path: 'useractivity', component: UseractivityComponent },
            { path: '', component: SecureHomeComponent }]
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


