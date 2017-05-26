import {Component, OnInit} from '@angular/core';
import {CheckoutService} from '../../shared/checkout-service';


@Component({
    selector: 'bc-foundation-page',
    templateUrl: './foundation.html',
    styleUrls: ['./foundation.scss']
})
export class FoundationPageComponent implements OnInit {


    constructor(public checkout: CheckoutService) {

    }

    ngOnInit() {

    }

    openCheckout(description: string, amount: number) {
        this.checkout.openCheckout(description, amount);
    }

}


