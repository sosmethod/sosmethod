import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../shared/shared.module';
export const COMPONENTS: any = [];

import {ModuleWithProviders} from '@angular/core';

export const menuRoutes: Routes = [
    {
        path: 'course',
        loadChildren: './menus.module#MenusModule'
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(menuRoutes);


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class MenuModule {
}
