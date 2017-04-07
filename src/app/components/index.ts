import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {LayoutComponent} from './navigation/layout/layout';
import {NavItemComponent} from './navigation/nav-item/nav-item';
import {SidenavComponent} from './navigation/sidenav/sidenav';
import {ToolbarComponent} from './navigation/toolbar/toolbar';
import {SupportMenuComponent} from './navigation/support/support';
import {AccountLinksComponent} from './navigation/account-links/account-links';
import {LanguageMenuComponent} from './navigation/language/language';
import {FooterComponent} from './navigation/footer/footer';

import {TranslateModule} from '@ngx-translate/core';

import {PipesModule} from '../pipes';
import {NavigationModule} from './navigation';

export const COMPONENTS = [
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    SupportMenuComponent,
    LanguageMenuComponent,
    AccountLinksComponent,
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        PipesModule,
        TranslateModule,
        FormsModule,

        NavigationModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ComponentsModule {
}
