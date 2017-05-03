import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import {environment} from '../../../../config/environment';
import {AuthGuard} from '../../guards/auth';
import {AngularFire} from 'angularfire2';
import {Http} from '@angular/http';

@Component({
    selector: 'bc-signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss']
})
export class SignupComponent implements OnInit {


    constructor(
        public af: AngularFire,
        public http: Http,
        public auth: AuthGuard) {

    }

    ngOnInit() {

    }

    openCheckout(description: string, amount: number) {
        const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_iPfh7cvdMxpsR2gWRn5rwH61',
            image: 'https://sosmethod.herokuapp.com/Butterfly-Head-blue.png',
            locale: 'auto',
            zipCode: true,
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                this.http.post(environment.paymentUrl, JSON.stringify({
                    token: token,
                    plan: description,
                    email: this.user.email
                })).subscribe();
            }
        });

        handler.open({
            name: 'TheSOSMethod.com',
            description: description,
            amount: amount
        });

    }

}


