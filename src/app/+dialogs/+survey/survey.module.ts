import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {routing} from './survey.routing';
import {SurveySeriesComponent} from './survey-series';
import {DialogGuard} from '../dialog-guard';
import {AnswerComponent} from './answer';
import {SurveyCompletedComponent} from './survey-completed';
import {AnswerRecommendComponent} from './answer-recommend';
import {SurveyMeditationComponent} from './survey-meditation';
import {SurveyDialogComponent} from './survey';


export const COMPONENTS = [
    SurveySeriesComponent,
    SurveyDialogComponent,
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
