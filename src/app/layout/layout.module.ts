import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {NavItemComponent} from './nav-item/nav-item';
import {SidenavComponent} from './sidenav/sidenav';
import {ToolbarComponent} from './toolbar/toolbar';
import {FooterComponent} from './footer/footer';
import {LanguageMenuComponent} from './language/language';
import {VideoComponent} from './video/video';

import {COMMON_MODULES} from '../shared/common.module';

export const COMPONENTS = [
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    LanguageMenuComponent,
    VideoComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class LayoutModule {
}


