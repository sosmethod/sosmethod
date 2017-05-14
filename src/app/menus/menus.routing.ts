import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../dialogs/+auth/auth-guard';

import {DiscoveryComponent} from './discovery/discovery';
import {MeditationComponent} from './meditation/meditation';
import {MainComponent} from './main/main';

export const menuRoutes: Routes = [
    {
        path: 'fb',
        component: MainComponent,
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: MainComponent,
    },
    {
        path: 'explore',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        redirectTo: '/discovery/essentials',
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
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(menuRoutes);

