import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {SignupComponent} from './signup';

export const signupRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: SignupComponent,
    },
];


export const routing: ModuleWithProviders = RouterModule.forChild(signupRoutes);

