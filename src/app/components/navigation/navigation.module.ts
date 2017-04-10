import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MainComponent} from './main/main';
import {DiscoveryComponent} from './discovery/discovery';
import {MeditationComponent} from './meditation/meditation';
import {CourseComponent} from './course/course';

export const COMPONENTS = [
    MainComponent,
    CourseComponent,
    DiscoveryComponent,
    MeditationComponent
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        FormsModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class NavigationModule {


}


