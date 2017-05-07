import {NgModule} from '@angular/core';

import {SurveyDialogComponent} from './survey';

import {COMMON_MODULES} from '../../shared/common.module';
import {routing} from './survey.routing';
import {AuthGuard} from '../auth/auth-guard';
import {DialogGuard} from '../dialog-guard';


export const COMPONENTS = [
    SurveyDialogComponent,
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
export class SurveyModule {
}
