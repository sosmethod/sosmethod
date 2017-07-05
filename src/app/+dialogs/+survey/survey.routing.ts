import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../+auth/auth-guard';

import {DialogGuard} from '../dialog-guard';
import {SurveyDialogComponent} from './survey';
import {SurveySeriesComponent} from './survey-series';
import {SurveyCompletedComponent} from './survey-completed';
import {SurveyMeditationComponent} from './survey-meditation';

export const surveyRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyDialogComponent,
    },
    {
        path: 'series/:series',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveySeriesComponent,
    },
    {
        path: 'completed/:series',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyCompletedComponent,
    },
    {
        path: 'meditation/:series',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyMeditationComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(surveyRoutes);

