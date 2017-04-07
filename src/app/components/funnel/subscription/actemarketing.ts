import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from '../../../models/zuora/subscription';
import { Product } from '../../../models/zuora/product';
import { ProductCatalogService } from '../../../services/product-catalog';
import { RatePlan } from '../../../models/zuora/rate-plan';
import 'rxjs/add/operator/mergeMap';
import {SubscriptionComponent} from "./subscription";


@Component({
    selector: 'bc-subscription-actemarketing',
    templateUrl: './actemarketing.html'
})
export class ActEmarketingComponent extends SubscriptionComponent {
    public userCount = 1;
    public contacts:string = '15';
    public plan = 'basic';
    public callList = false;

    constructor(protected catalog: ProductCatalogService) {
        super(catalog);
    }
}
