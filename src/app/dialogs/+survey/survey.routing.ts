import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../+auth/auth-guard';

import {DialogGuard} from '../dialog-guard';
import {SurveyDialogComponent} from './survey';
import {SurveyProfileComponent} from './survey-profile';
import {SurveySeriesComponent} from './survey-series';

export const surveyRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyDialogComponent,
    },
    {
        path: 'profile',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyProfileComponent,
    },
    {
        path: 'series/:series',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveySeriesComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(surveyRoutes);

