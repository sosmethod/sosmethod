import { Component, Input } from '@angular/core';
import {ProductCatalogService} from '../../../services/product-catalog';

@Component({
    selector: 'bc-product-summary',
    templateUrl: './product-summary.html',
    styleUrls: ['./product-summary.scss']
})
export class ProductSummaryComponent {

    public billed: string = 'monthly';

    constructor(public catalog: ProductCatalogService) {  }


}

