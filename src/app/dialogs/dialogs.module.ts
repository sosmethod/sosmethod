import {NgModule} from '@angular/core';

import {ContactDialogComponent} from './contact/contact';
import {FaqDialogComponent} from './faq/faq';

import {COMMON_MODULES} from '../shared/common.module';
import {routing} from './dialogs.routing';


export const COMPONENTS = [
    ContactDialogComponent,
    FaqDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class DialogModule {
}
