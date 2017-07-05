import {NgModule} from '@angular/core';

import {BonusDialogComponent} from './bonus';

import {COMMON_MODULES} from '../../shared/shared.module';
import {routing} from './bonus.routing';
import {DialogGuard} from '../dialog-guard';


export const COMPONENTS = [
    BonusDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    providers: [DialogGuard],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class BonusModule {
}
