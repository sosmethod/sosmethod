import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {FoundationPageComponent} from './blog';

export const giftRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: FoundationPageComponent,
    },
];


export const routing: ModuleWithProviders = RouterModule.forChild(giftRoutes);

