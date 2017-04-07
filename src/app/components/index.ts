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

import {ProductTilesComponent} from './funnel/product-tiles/product-tiles';
import {ProductTileComponent} from './funnel/product-tile/product-tile';
import {ProductDescriptionComponent} from './funnel/product-description/product-description';
import {ProductSummaryComponent} from './funnel/product-summary/product-summary';
import {SubscriptionsAddComponent} from './funnel/subscriptions-add/subscriptions-add';
import {SubscriptionsComponent} from './funnel/subscriptions/subscriptions';
import {SubscriptionComponent} from './funnel/subscription/subscription';

import {TranslateModule} from '@ngx-translate/core';

import {PipesModule} from '../pipes';
import {ActPremiumCloudComponent} from './funnel/subscription/actpremiumcloud';
import {ActEmarketingComponent} from './funnel/subscription/actemarketing';
import {SupportComponent} from './funnel/subscription/support';
import {ActPremiumComponent} from './funnel/subscription/actpremium';
import {HandheldContactComponent} from './funnel/subscription/handheld';
import {SubtotalComponent} from './funnel/subtotal/subtotal';
import {TrackerComponent} from './funnel/tracker/tracker';


export const COMPONENTS = [
    LayoutComponent,
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    SupportMenuComponent,
    LanguageMenuComponent,
    AccountLinksComponent,
    ProductTilesComponent,
    ProductTileComponent,
    ProductDescriptionComponent,
    ProductSummaryComponent,
    SubscriptionsAddComponent,
    SubscriptionsComponent,
    SubscriptionComponent,
    ActPremiumCloudComponent,
    ActEmarketingComponent,
    SupportComponent,
    ActPremiumComponent,
    HandheldContactComponent,
    SubtotalComponent,
    TrackerComponent
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        PipesModule,
        TranslateModule,
        FormsModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ComponentsModule {
}
