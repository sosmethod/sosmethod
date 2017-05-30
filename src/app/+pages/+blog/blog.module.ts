import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {FoundationPageComponent} from './blog';
import {routing} from './blog.routing';
import {SharedPagesModule} from '../shared/shared-pages.module';
export const COMPONENTS = [
    FoundationPageComponent
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        SharedPagesModule,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class FoundationModule {
}
