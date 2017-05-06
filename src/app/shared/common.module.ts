import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

export const COMPONENTS: any[] = [];

@NgModule({
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class SharedModule {
}

export const COMMON_MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    HttpModule,
    SharedModule
];
