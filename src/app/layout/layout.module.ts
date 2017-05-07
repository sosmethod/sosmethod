import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {SidenavComponent} from './sidenav/sidenav';
import {ToolbarComponent} from './toolbar/toolbar';
import {FooterComponent} from './footer/footer';
import {LanguageMenuComponent} from './language/language';
import {VideoComponent} from './video/video';

import {COMMON_MODULES} from '../shared/common.module';
import {ToolsMenuComponent} from './sidenav/tools';
import {SecondaryMenuComponent} from './sidenav/secondary';
import {ShareMenuComponent} from './sidenav/share';

export const COMPONENTS = [
    LayoutComponent,
    SidenavComponent,
    ToolsMenuComponent,
    SecondaryMenuComponent,
    ShareMenuComponent,
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


