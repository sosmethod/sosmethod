import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {GiftTestimonialsComponent} from '../+testimonials/gift-testimonials';
import {GiftComponent} from './gift';
import {FoundationComponent} from './foundation';
import {routing} from './gift.routing';
import {SharedPagesModule} from '../shared/shared-pages.module';
export const COMPONENTS = [
    GiftComponent,
    GiftTestimonialsComponent,
    FoundationComponent
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
export class GiftModule {
}
