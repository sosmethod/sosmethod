import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bc-signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss']
})
export class SignupComponent implements OnInit {


    constructor() {

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
            }
        });

        handler.open({
            name: 'TheSOSMethod.com',
            description: description,
            amount: amount
        });

    }

    public createCharge() {

        /*
        // Get the credit card details submitted by the form
        var token = req.body.stripeToken; // Using Express
        var email, sub, user;
        var trial = req.cookies['trial'];

        stripe.tokens.retrieve(token).then(function (token) {
            console.log(token);
            email = token.email;

            // Create a charge: this will charge the user's card
            return stripe.customers.create({
                source: token.id,
                email: email
            });

        }).then(function(customer) {
            console.log(customer);

            if(req.body.plan != '2year' && req.body.plan != 'yearly_gift') {
                return stripe.subscriptions.create({
                    customer: customer.id,
                    // implement different plans here
                    plan: req.body.plan + (req.body.plan == 'monthly' && trial ? '_trial' : '')
                });
            }
            else {
                return stripe.charge.create({
                    amount: 11976, // Amount in cents
                    currency: "usd",
                    source: token.id,
                    description: "THE SOS METHOD 2YEAR"
                });
            }

        }, function (err) {
            console.log(err);
            if (err.type === 'StripeCardError') {
                // The card has been declined
                return res.redirect('/signup');
            }

        }).then(function (subscription) {
            sub = subscription;
            return User.findOne({username: email});

        }).then(function (usr) {
            if (!usr) {
                // TODO: generate a random password for the email?
                return User.register(new User({username: email, name: {first: '', last: ''}}), req.body.passwd);
            }
            else {
                user = usr;
            }

        }).then(function (usr) {
            if(!user) {
                user = usr;
                user.isAuthenticated = true;
                user.isNew = true;
            }
            return user;

        }).then(function (user) {
            user.purchases = (user.purchases || []).concat([sub]);
            user.markModified('purchases');
            return user.save();

        }).then(function () {
            if(user.isNew) {
                return sendRegistrationConfirmation(user);
            }
            return user;

        }).then(sendPurchaseConfirmation).then(function () {
            if (user.isNew || !req.isAuthenticated()) {
                return req.logIn(user, function (err) {
                    if(err) { console.log(err) }
                    return res.redirect('/');
                });
            }
            else {
                return res.redirect('/');
            }

        });

        */

    }

}


