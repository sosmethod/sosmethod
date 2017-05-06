import {NgModule} from '@angular/core';
import {TestimonialsComponent} from './shared/testimonials';
import {routing} from './pages.routing';
import {COMMON_MODULES} from '../shared/common.module';
import {StaticFooterComponent} from './shared/page-footer';
export const COMPONENTS = [
    TestimonialsComponent,
    StaticFooterComponent
];


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
