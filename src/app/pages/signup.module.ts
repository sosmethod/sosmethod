import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../shared/common.module';
import {SignupComponent} from './signup/signup';
import {TestimonialPageComponent} from './testimonials/page';
import {TestimonialsComponent} from './testimonials/testimonials';
import {routing} from "./pages.routing";
export const COMPONENTS = [
    TestimonialsComponent,
    TestimonialPageComponent,
    SignupComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class SignupModule {
}
