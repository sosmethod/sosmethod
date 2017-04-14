import { Routes } from '@angular/router';

import { NotFoundComponent } from './error/404/not-found';
import { NotAuthorizedComponent } from './error/401/not-authorized';


import { AuthGuard } from './guards/auth';


import {MainComponent} from './components/navigation/main/main';
import {CourseComponent} from './components/navigation/course/course';
import {DiscoveryComponent} from './components/navigation/discovery/discovery';
import {MeditationComponent} from './components/navigation/meditation/meditation';
import {SignupComponent} from './components/signup/signup';
import {GiftComponent} from './components/gift/gift';
import {DialogGuard} from "./guards/dialog";
import {FaqDialogComponent} from "./components/faq/faq";
import {ContactDialogComponent} from "./components/contact/contact";
import {SurveyDialogComponent} from "./components/survey/survey";
import {BeginComponent} from "./components/navigation/begin/begin";
import {PlayerComponent} from "./components/player/player";
import {ToolDialogComponent} from "./components/tools/tool";

const secureHomeRoutes: Routes = [
    {
        path: 'home',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
        ]
    }
];

export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: MainComponent,
    },
    {
        path: 'signup',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: SignupComponent,
    },
    {
        path: 'gift',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: GiftComponent,
    },
    {
        path: 'explore',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        redirectTo: '/discovery',
        pathMatch: 'full'
    },
    {
        path: 'discovery',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        children: [
            {
                path: ':discovery',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: DiscoveryComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: DiscoveryComponent,
            }
        ]
    },
    {
        path: 'meditation',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        children: [
            {
                path: ':discovery',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: MeditationComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: MeditationComponent,
            }
        ]
    },
    {
        path: 'tool/:tool',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous']},
        component: ToolDialogComponent,
    },
    {
        path: 'faq',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous']},
        component: FaqDialogComponent,
    },
    {
        path: 'contact',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous']},
        component: ContactDialogComponent,
    },
    {
        path: 'survey',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous']},
        component: SurveyDialogComponent,
    },
    {
        path: 'begin',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: BeginComponent,
    },
    {
        path: '_5_day/:discovery',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        children: [
            {
                path: ':audio',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: PlayerComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: PlayerComponent,
            }]
    },
    {
        path: '_11_day/:discovery',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        children: [
            {
                path: ':audio',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: PlayerComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: PlayerComponent,
            }
        ]
    },
    {
        path: 'meditations/:discovery/:meditation',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        children: [
            {
                path: ':audio',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: PlayerComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous']},
                component: PlayerComponent,
            }
        ]
    },
    {
        path: '**error400',
        component: NotAuthorizedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },

];


