import {NgModule} from '@angular/core';
import {routing} from './pages.routing';
import {COMMON_MODULES} from '../shared/common.module';
export const COMPONENTS: any = [];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PagesModule {
}
