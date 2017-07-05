import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {StaticFooterComponent} from './page-footer';
import {TestimonialsComponent} from './testimonials';
export const COMPONENTS = [
    TestimonialsComponent,
    StaticFooterComponent
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class SharedPagesModule {
}
