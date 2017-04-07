import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from '../../../models/zuora/subscription';
import { Product } from '../../../models/zuora/product';
import { ProductCatalogService } from '../../../services/product-catalog';
import { RatePlan } from '../../../models/zuora/rate-plan';
import 'rxjs/add/operator/mergeMap';
import {SubscriptionComponent} from "./subscription";


@Component({
    selector: 'bc-subscription-support',
    templateUrl: './support.html'
})
export class SupportComponent extends SubscriptionComponent {
    public support = 'yearly';

    constructor(protected catalog: ProductCatalogService) {
        super(catalog);
    }

}
