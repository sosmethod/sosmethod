import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../../dialogs/auth/auth-guard';
import {TestimonialPageComponent} from './page';

export const testimonialsRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: TestimonialPageComponent,
    },
];


export const routing: ModuleWithProviders = RouterModule.forChild(testimonialsRoutes);

