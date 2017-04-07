import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MainComponent} from './main/main';

export const COMPONENTS = [
    MainComponent,
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
