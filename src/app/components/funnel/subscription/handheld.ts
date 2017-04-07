import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from '../../../models/zuora/subscription';
import { Product } from '../../../models/zuora/product';
import { ProductCatalogService } from '../../../services/product-catalog';
import { RatePlan } from '../../../models/zuora/rate-plan';
import 'rxjs/add/operator/mergeMap';
import {SubscriptionComponent} from "./subscription";


@Component({
    selector: 'bc-subscription-handheld',
    templateUrl: './handheld.html'
})
export class HandheldContactComponent extends SubscriptionComponent {
    public plan = 'standard';
    public contacts = '15';

    constructor(protected catalog: ProductCatalogService) {
        super(catalog);
    }
}
