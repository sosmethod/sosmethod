import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Product } from '../../../models/zuora/product';
import { ProductCatalogService } from '../../../services/product-catalog';

@Component({
    selector: 'bc-product-tiles',
    templateUrl: './product-tiles.html'
})
export class ProductTilesComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(public router: Router, private http: Http, private catalog: ProductCatalogService) {

    }

    ngOnInit() {
        this.products$ = this.catalog.getProducts().map(p => p.filter(this.filterProducts));
    }

    filterProducts(p: Product): boolean {
        return (p.type || '').match(/^(actpro|actpremiumcloud|actpremium)$/ig) !== null;
    }

}
