import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './+auth/auth-guard';

import {DialogGuard} from './dialog-guard';
import {FaqDialogComponent} from './faq/faq';
import {ContactDialogComponent} from './contact/contact';

export const dialogRoutes: Routes = [
    {
        path: 'tool',
        loadChildren: './+tools/tools.module#ToolsModule'
    },
    {
        path: 'bonus',
        loadChildren: './+bonus/bonus.module#BonusModule'
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
        loadChildren: './+survey/survey.module#SurveyModule'
    },
    {
        path: 'account',
        loadChildren: './+auth/auth.module#AuthModule'
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(dialogRoutes);

