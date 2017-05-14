import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {MainComponent} from './menus/main/main';

export const appRoutes: Routes = [
    {
        path: '**',
        component: MainComponent
    },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: false});

