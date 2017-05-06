import {NgModule} from '@angular/core';

import {BonusDialogComponent} from './bonus/bonus';

import {COMMON_MODULES} from '../shared/common.module';


export const COMPONENTS = [
    BonusDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class BonusModule {
}
