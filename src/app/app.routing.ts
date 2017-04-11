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
        component: CourseComponent,
    },
    {
        path: 'discovery',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: DiscoveryComponent,
    },
    {
        path: 'discovery/:discovery',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: DiscoveryComponent,
    },
    {
        path: 'meditation',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: MeditationComponent,
    },
    {
        path: 'meditation/:meditation',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous']},
        component: MeditationComponent,
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
        path: '**error400',
        component: NotAuthorizedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },

];


