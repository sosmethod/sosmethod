import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../auth/auth-guard';

import {ContentGuard} from '../../menus/content-guard';
import {DialogGuard} from '../dialog-guard';
import {ToolDialogComponent} from './tool';

export const toolsRoutes: Routes = [
    {
        path: ':tool',
        canActivate: [AuthGuard, ContentGuard, DialogGuard],
        canActivateChild: [AuthGuard, ContentGuard, DialogGuard],
        data: {roles: ['anonymous', 'user']},
        component: ToolDialogComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(toolsRoutes);

