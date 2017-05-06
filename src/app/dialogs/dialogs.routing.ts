import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './auth/auth-guard';

import {ContentGuard} from '../menus/content-guard';
import {DialogGuard} from './dialog-guard';
import {ToolDialogComponent} from './tools/tool';
import {BonusDialogComponent} from './bonus/bonus';
import {FaqDialogComponent} from './faq/faq';
import {ContactDialogComponent} from './contact/contact';
import {SurveyDialogComponent} from './survey/survey';

export const dialogRoutes: Routes = [
    {
        path: 'tool/:tool',
        canActivate: [AuthGuard, ContentGuard, DialogGuard],
        canActivateChild: [AuthGuard, ContentGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ToolDialogComponent,
    },
    {
        path: 'bonus/:bonus',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: BonusDialogComponent,
    },
    {
        path: 'faq',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: FaqDialogComponent,
    },
    {
        path: 'contact',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ContactDialogComponent,
    },
    {
        path: 'survey',
        canActivate: [AuthGuard, DialogGuard],
        canActivateChild: [AuthGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: SurveyDialogComponent,
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(dialogRoutes);

