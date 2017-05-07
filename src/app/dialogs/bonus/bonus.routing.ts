import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../auth/auth-guard';

import {DialogGuard} from '../dialog-guard';
import {BonusDialogComponent} from './bonus';

export const bonusRoutes: Routes = [
    {
        path: ':bonus',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: BonusDialogComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(bonusRoutes);

