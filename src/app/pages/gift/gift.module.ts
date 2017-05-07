import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/common.module';
import {GiftTestimonialsComponent} from '../testimonials/gift-testimonials';
import {GiftComponent} from './gift';
import {FoundationComponent} from './foundation';
import {routing} from './gift.routing';
import {PagesModule} from '../pages.module';
export const COMPONENTS = [
    GiftComponent,
    GiftTestimonialsComponent,
    FoundationComponent
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
export class GiftModule {
}
