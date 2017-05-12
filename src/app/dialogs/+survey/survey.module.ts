import {NgModule} from '@angular/core';

import {SurveyDialogComponent} from './survey';

import {COMMON_MODULES} from '../../shared/common.module';
import {routing} from './survey.routing';
import {SurveySeriesComponent} from './survey-series';
import {SurveyProfileComponent} from './survey-profile';
import {DialogGuard} from '../dialog-guard';
import {AnswerComponent} from './answer';


export const COMPONENTS = [
    SurveyDialogComponent,
    SurveySeriesComponent,
    SurveyProfileComponent,
    AnswerComponent
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
export class SurveyModule {
}
