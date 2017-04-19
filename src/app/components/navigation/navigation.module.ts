import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MainComponent} from './main/main';
import {DiscoveryComponent} from './discovery/discovery';
import {MeditationComponent} from './meditation/meditation';
import {CourseComponent} from './course/course';
import {BeginComponent} from "./begin/begin";
import {DiscoverySeriesComponent} from "./discovery/discovery-series";
import {DiscoverySubtextComponent} from "./discovery/discovery-subtext";
import {MeditationsComponent} from "./meditation/meditations";
import {MeditateComponent} from "./meditate/meditate";
import {MeditationsSubtextComponent} from "./meditation/meditations-subtext";

export const COMPONENTS = [
    MainComponent,
    CourseComponent,
    DiscoveryComponent,
    MeditationComponent,
    BeginComponent,
    DiscoverySeriesComponent,
    DiscoverySubtextComponent,
    MeditationsComponent,
    MeditateComponent,
    MeditationsSubtextComponent
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class NavigationModule {


}


