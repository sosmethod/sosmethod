import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {AngularFireAuth} from 'angularfire2/auth';
import {Environment} from '../../../../config/environment.i';

@Component({
    selector: 'bc-signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss']
})
export class SignupComponent implements OnInit {


    constructor(public user: AngularFireAuth,
                public http: Http) {

    }

    ngOnInit() {

    }

    openCheckout(description: string, amount: number) {
        const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_iPfh7cvdMxpsR2gWRn5rwH61',
            image: 'https://sosmethod.io/Butterfly-Head-blue.png',
            locale: 'auto',
            zipCode: true,
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                this.http.post(Environment.env.paymentUrl, JSON.stringify({
                    token: token,
                    plan: description,
                    email: this.user.auth.currentUser.email
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


