import {Environment} from '../../../config/environment.i';
import {Injectable} from '@angular/core';
import {AuthGuard} from '../+dialogs/+auth/auth-guard';
import {Http} from '@angular/http';
@Injectable()
export class CheckoutService {

    constructor(public user: AuthGuard, public http: Http) {
    }

    openCheckout(description: string, amount: number) {
        const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_iPfh7cvdMxpsR2gWRn5rwH61',
            image: 'https://sosmethod.io/Butterfly-Head-blue.jpg',
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


