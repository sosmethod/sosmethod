import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './error/404/not-found';
import {NotAuthorizedComponent} from './error/401/not-authorized';
import {ModuleWithProviders} from '@angular/core';

export const appRoutes: Routes = [
    {
        path: '**error400',
        component: NotAuthorizedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});

