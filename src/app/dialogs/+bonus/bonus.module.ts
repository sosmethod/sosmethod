import {NgModule} from '@angular/core';

import {BonusDialogComponent} from './bonus';

import {COMMON_MODULES} from '../../shared/common.module';
import {routing} from './bonus.routing';
import {AuthGuard} from '../+auth/auth-guard';
import {DialogGuard} from '../dialog-guard';


export const COMPONENTS = [
    BonusDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    providers: [AuthGuard, DialogGuard],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class BonusModule {
}
