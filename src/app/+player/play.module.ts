import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../shared/shared.module';
export const COMPONENTS: any = [];

import {ModuleWithProviders} from '@angular/core';

export const playRoutes: Routes = [
    {
        path: 'play',
        loadChildren: './player.module#PlayerModule'
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(playRoutes);


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PlayModule {
}
