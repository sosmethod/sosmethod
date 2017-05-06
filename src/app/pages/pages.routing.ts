import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from '../dialogs/auth/auth-guard';
import {SignupComponent} from './signup/signup';
import {GiftComponent} from './gift/gift';
import {TestimonialPageComponent} from './testimonials/page';

export const pageRoutes: Routes = [
    {
        path: 'signup',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: SignupComponent,
    },
    {
        path: 'gift',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: GiftComponent,
    },
    {
        path: 'testimonials',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {roles: ['anonymous', 'user']},
        component: TestimonialPageComponent,
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(pageRoutes);

