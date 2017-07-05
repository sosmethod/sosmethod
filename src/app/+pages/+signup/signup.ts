import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {AngularFireAuth} from 'angularfire2/auth';
import {CheckoutService} from '../../shared/checkout-service';

@Component({
    selector: 'bc-signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss']
})
export class SignupComponent implements OnInit {


    constructor(public checkout: CheckoutService,
                public user: AngularFireAuth,
                public http: Http) {

    }

    ngOnInit() {

    }

    openCheckout(description: string, amount: number) {
        this.checkout.openCheckout(description, amount);
    }

}


