import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {ContentGuard} from '../menus/content-guard';
import {DialogGuard} from '../dialogs/dialog-guard';
import {AuthGuard} from '../dialogs/+auth/auth-guard';
import {LayoutService} from '../layout/layout-service';
import {AudioService} from '../layout/audio.service';
import {MetaService} from './meta-service';

export const COMPONENTS: any[] = [];

@NgModule({})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuard,
                DialogGuard,
                ContentGuard,
                AudioService,
                LayoutService,
                MetaService
            ]
        };
    }
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
