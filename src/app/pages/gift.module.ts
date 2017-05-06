import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../shared/common.module';
import {GiftTestimonialsComponent} from './testimonials/gift-testimonials';
import {GiftComponent} from './gift/gift';
import {FoundationComponent} from './gift/foundation';
export const COMPONENTS = [
    GiftComponent,
    GiftTestimonialsComponent,
    FoundationComponent
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class GiftModule {
}
