import {NgModule} from '@angular/core';

import {SurveyDialogComponent} from './survey/survey';

import {COMMON_MODULES} from '../shared/common.module';


export const COMPONENTS = [
    SurveyDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class SurveyModule {
}
