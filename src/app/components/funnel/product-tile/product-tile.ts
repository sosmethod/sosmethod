import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ProductCatalogService} from '../../../services/product-catalog';
import {Product} from "../../../models/zuora/product";

@Component({
    selector: 'bc-product-tile',
    templateUrl: './product-tile.html',
    styleUrls: ['./product-tile.scss']
})
export class ProductTileComponent implements OnInit {
    @Input() subscription: Product;

    constructor(public router: Router, public catalog: ProductCatalogService) {
    }

    ngOnInit() {
        console.log(this.subscription);
    }

    setSelectedProduct() {
      this.catalog.selectedProduct$ = Observable.of(this.subscription.type);
    }
}

