import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {MainComponent} from './+menus/main/main';
import {AuthGuard} from './+dialogs/+auth/auth-guard';

export const appRoutes: Routes = [
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
        path: '**',
        component: MainComponent
    },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: false});

