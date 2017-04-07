import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ProductCatalogService} from '../../../services/product-catalog';
import {Product} from '../../../models/zuora/product';

@Component({
    selector: 'bc-subtotal',
    templateUrl: './subtotal.html',
    styleUrls: ['./subtotal.scss']
})
export class SubtotalComponent implements OnInit {
    @Input() subscription: Product;

    constructor(public router: Router, public catalog: ProductCatalogService) {
    }

    ngOnInit() {
        console.log(this.subscription);
    }

}

