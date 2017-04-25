// Raw version of this file: https://raw.githubusercontent.com/auth0/webtask-scripts/master/stripe/stripe_charge.js
const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    logging = require('@google-cloud/logging')();

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token),
    currency = functions.config().stripe.currency || 'USD';

exports.processPayment = functions.https.onRequest((req, res) => {
    const val = event.data.val();
    // This onWrite will trigger whenever anything is written to the path, so
    // noop if the charge was deleted, errored out, or the Stripe API returned a result (id exists)
    if (val === null || val.id || val.error) return null;
    // Look up the Stripe customer id written in createStripeCustomer
    const emailKey = req.query.email.toLowerCase()
        .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
        .replace('[', '_').replace(']', '_');
    return admin.database().ref(`/users/${emailKey}/payments`).once('value').then(snapshot => {
        return snapshot.val();
    }).then(customer => {
        // Create a charge using the pushId as the idempotency key, protecting against double charges
        const amount = val.amount;
        const idempotency_key = event.params.id;
        let charge = {amount, currency, customer};
        if (val.source !== null) charge.source = val.source;
        return stripe.charges.create(charge, {idempotency_key});
    }).then(response => {
            // If the result is seccessful, write it back to the database
            return admin.database().ref(`/users/${emailKey}/payments${(new Date).getTime()}`).set(response);
        }, error => {
            const up = new Error(error);
            throw up;
        }
    );
});
