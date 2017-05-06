import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/common.module';
import {TestimonialPageComponent} from './page';
import {routing} from './testimonials.routing';
import {PagesModule} from "../pages.module";
export const COMPONENTS = [
    TestimonialPageComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        PagesModule,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class TestimonialsModule {
}
