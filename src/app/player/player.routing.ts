import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../dialogs/+auth/auth-guard';
import {PlayerComponent} from './player.component';
import {ContentGuard} from '../menus/content-guard';

export const playerRoutes: Routes = [
    {
        path: 'begin',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: PlayerComponent,
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
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(playerRoutes);

