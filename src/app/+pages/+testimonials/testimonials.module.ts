import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {TestimonialPageComponent} from './page';
import {routing} from './testimonials.routing';
import {SharedPagesModule} from '../shared/shared-pages.module';
export const COMPONENTS = [
    TestimonialPageComponent,
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
export class TestimonialsModule {
}
