import {Component, OnInit} from '@angular/core';
import {CheckoutService} from "../../shared/checkout-service";


@Component({
    selector: 'bc-gift',
    templateUrl: './gift.html',
    styleUrls: ['./gift.scss']
})
export class GiftComponent implements OnInit {

    constructor(public checkout: CheckoutService) {
    }

    ngOnInit() {
    }

    openCheckout(description: string, amount: number) {
        this.checkout.openCheckout(description, amount);
    }
}



