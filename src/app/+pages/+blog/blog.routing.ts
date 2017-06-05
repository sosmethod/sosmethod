import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {BlogComponent} from './blog';

export const blogRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: BlogComponent,
    },
];


export const routing: ModuleWithProviders = RouterModule.forChild(blogRoutes);

