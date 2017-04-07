import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from '../../../models/zuora/subscription';
import { Product } from '../../../models/zuora/product';
import { ProductCatalogService } from '../../../services/product-catalog';
import { RatePlan } from '../../../models/zuora/rate-plan';
import 'rxjs/add/operator/mergeMap';
import {SubscriptionComponent} from "./subscription";


@Component({
    selector: 'bc-subscription-actpremiumcloud',
    templateUrl: './actpremiumcloud.html'
})
export class ActPremiumCloudComponent extends SubscriptionComponent {
    public userCount = 1;
    public product$: Observable<Product>;

    constructor(protected catalog: ProductCatalogService) {
        super(catalog);
    }

}
