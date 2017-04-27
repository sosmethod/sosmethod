import { Routes } from '@angular/router';

import { NotFoundComponent } from './error/404/not-found';
import { NotAuthorizedComponent } from './error/401/not-authorized';


import { AuthGuard } from './guards/auth';


import {MainComponent} from './components/navigation/main/main';
import {DiscoveryComponent} from './components/navigation/discovery/discovery';
import {MeditationComponent} from './components/navigation/meditation/meditation';
import {SignupComponent} from './components/signup/signup';
import {GiftComponent} from './components/gift/gift';
import {DialogGuard} from './guards/dialog';
import {FaqDialogComponent} from './components/faq/faq';
import {ContactDialogComponent} from './components/contact/contact';
import {SurveyDialogComponent} from './components/survey/survey';
import {PlayerComponent} from './components/player/player';
import {ToolDialogComponent} from './components/tools/tool';
import {BonusDialogComponent} from './components/bonus/bonus';
import {TestimonialPageComponent} from "./components/testimonials/page";
import {ContentGuard} from "./guards/content";

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
        data: {roles: ['anonymous', 'user']},
        component: MainComponent,
    },
    {
        path: 'signup',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: SignupComponent,
    },
    {
        path: 'gift',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: GiftComponent,
    },
    {
        path: 'explore',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        redirectTo: '/discovery',
        pathMatch: 'full'
    },
    {
        path: 'discovery',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
            {
                path: ':discovery',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous', 'user']},
                component: DiscoveryComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous', 'user']},
                component: DiscoveryComponent,
            }
        ]
    },
    {
        path: 'meditation',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
            {
                path: ':discovery',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous', 'user']},
                component: MeditationComponent,
            },
            {
                path: '',
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: {roles: ['anonymous', 'user']},
                component: MeditationComponent,
            }
        ]
    },
    {
        path: 'tool/:tool',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ToolDialogComponent,
    },
    {
        path: 'bonus/:bonus',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: BonusDialogComponent,
    },
    {
        path: 'faq',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: FaqDialogComponent,
    },
    {
        path: 'contact',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ContactDialogComponent,
    },
    {
        path: 'survey',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyDialogComponent,
    },
    {
        path: 'begin',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: PlayerComponent,
    },
    {
        path: 'testimonials',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: TestimonialPageComponent,
    },
    {
        path: '_5_day/:discovery',
        canActivate: [AuthGuard, ContentGuard],
        canActivateChild: [AuthGuard, ContentGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
            {
                path: ':audio',
                data: {roles: ['anonymous', 'user']},
                component: PlayerComponent,
            },
            {
                path: '',
                data: {roles: ['anonymous', 'user']},
                component: PlayerComponent,
            }]
    },
    {
        path: '_11_day/:discovery',
        canActivate: [AuthGuard, ContentGuard],
        canActivateChild: [AuthGuard, ContentGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
            {
                path: ':audio',
                data: {roles: ['anonymous', 'user']},
                component: PlayerComponent,
            },
            {
                path: '',
                data: {roles: ['anonymous', 'user']},
                component: PlayerComponent,
            }
        ]
    },
    {
        path: 'meditations/:discovery/:meditation',
        canActivate: [AuthGuard, ContentGuard],
        canActivateChild: [AuthGuard, ContentGuard],
        data: {roles: ['anonymous', 'user']},
        children: [
            {
                path: ':audio',
                data: {roles: ['anonymous', 'user']},
                component: PlayerComponent,
            },
            {
                path: '',
                data: {roles: ['anonymous', 'user']},
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


