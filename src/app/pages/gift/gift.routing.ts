import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../../dialogs/auth/auth-guard';
import {GiftComponent} from './gift';

export const giftRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: GiftComponent,
    },
];


export const routing: ModuleWithProviders = RouterModule.forChild(giftRoutes);

