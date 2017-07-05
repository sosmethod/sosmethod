import {Component, OnInit} from '@angular/core';
import {CheckoutService} from '../../shared/checkout-service';


@Component({
    selector: 'bc-blog',
    templateUrl: './blog.html',
    styleUrls: ['./blog.scss']
})
export class BlogComponent implements OnInit {


    constructor(public checkout: CheckoutService) {

    }

    ngOnInit() {

    }

    openCheckout(description: string, amount: number) {
        this.checkout.openCheckout(description, amount);
    }

}


