import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/common.module';
import {SignupComponent} from './signup';
import {routing} from './signup.routing';
import {PagesModule} from "../pages.module";
export const COMPONENTS = [
    SignupComponent,
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
export class SignupModule {
}
