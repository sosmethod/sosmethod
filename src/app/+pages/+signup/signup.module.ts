import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {SignupComponent} from './signup';
import {routing} from './signup.routing';
import {SharedPagesModule} from '../shared/shared-pages.module';
export const COMPONENTS = [
    SignupComponent,
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
export class SignupModule {
}
