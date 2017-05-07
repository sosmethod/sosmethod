import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../+auth/auth-guard';

import {DialogGuard} from '../dialog-guard';
import {SurveyDialogComponent} from './survey';

export const surveyRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyDialogComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(surveyRoutes);

