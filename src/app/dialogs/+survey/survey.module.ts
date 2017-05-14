import {NgModule} from '@angular/core';

import {SurveyDialogComponent} from './survey';

import {COMMON_MODULES} from '../../shared/common.module';
import {routing} from './survey.routing';
import {SurveySeriesComponent} from './survey-series';
import {SurveyProfileComponent} from './survey-profile';
import {DialogGuard} from '../dialog-guard';
import {AnswerComponent} from './answer';
import {SurveyCompletedComponent} from './survey-completed';
import {AnswerRecommendComponent} from './answer-recommend';
import {SurveyMeditationComponent} from './survey-meditation';


export const COMPONENTS = [
    SurveyDialogComponent,
    SurveySeriesComponent,
    SurveyProfileComponent,
    SurveyCompletedComponent,
    AnswerRecommendComponent,
    SurveyMeditationComponent,
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
