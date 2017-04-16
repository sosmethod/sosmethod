import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {LayoutComponent} from './navigation/layout/layout';
import {NavItemComponent} from './navigation/nav-item/nav-item';
import {SidenavComponent} from './navigation/sidenav/sidenav';
import {ToolbarComponent} from './navigation/toolbar/toolbar';
import {AccountLinksComponent} from './navigation/account-links/account-links';
import {LanguageMenuComponent} from './navigation/language/language';
import {FooterComponent} from './navigation/footer/footer';

import {TranslateModule} from '@ngx-translate/core';

import {NavigationModule} from './navigation';

import {VideoComponent} from './navigation/video/video';
import {SignupComponent} from './signup/signup';
import {ContactDialogComponent} from './contact/contact';
import {TestimonialsComponent} from './testimonials/testimonials';
import {GiftTestimonialsComponent} from './testimonials/gift-testimonials';
import {GiftComponent} from './gift/gift';
import {FoundationComponent} from './gift/foundation';
import {FaqDialogComponent} from './faq/faq';
import {ToolDialogComponent} from './tools/tool';
import {SurveyDialogComponent} from './survey/survey';
import {PlayerComponent} from './player/player';
import {PlayerControlsComponent} from './player/player-controls';
import {BonusDialogComponent} from "./bonus/bonus";


export const COMPONENTS = [
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    LanguageMenuComponent,
    AccountLinksComponent,
    VideoComponent,
    SignupComponent,
    GiftComponent,
    TestimonialsComponent,
    GiftTestimonialsComponent,
    FoundationComponent,
    PlayerComponent,
    PlayerControlsComponent,

    SurveyDialogComponent,
    ContactDialogComponent,
    FaqDialogComponent,
    ToolDialogComponent,
    BonusDialogComponent
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        TranslateModule,
        FormsModule,

        NavigationModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ComponentsModule {
}
