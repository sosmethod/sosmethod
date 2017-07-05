import {RouterModule, Routes} from '@angular/router';

import {ModuleWithProviders} from '@angular/core';

export const pagesRoutes: Routes = [
    {
        path: 'signup',
        loadChildren: './+signup/signup.module#SignupModule'
    },
    {
        path: 'gift',
        loadChildren: './+gift/gift.module#GiftModule'
    },
    {
        path: 'testimonials',
        loadChildren: './+testimonials/testimonials.module#TestimonialsModule'
    },
    {
        path: 'foundation',
        loadChildren: './+foundation/foundation.module#FoundationModule'
    },
    {
        path: 'blog',
        loadChildren: './+blog/blog.module#BlogModule'
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(pagesRoutes);

