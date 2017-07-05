import {Environment} from './environment.i';

export const environment: Environment = {
    production: true,

    paymentUrl: 'https://us-central1-sosmethod-36e55.cloudfunctions.net/processPayment',
    sendgridUrl: 'https://us-central1-sosmethod-36e55.cloudfunctions.net/sendgridEmail',
    tokenUrl: 'http://localhost/identity/connect/token',
    revokeUrl: 'http://localhost/identity/connect/revocation',
    fbUrl: 'http://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fus-central1-sosmethod-36e55.cloudfunctions.net%2Ffb%3Ffb%3D',
    twUrl: 'https://twitter.com/intent/tweet?text=Check out https%3A%2F%2Fus-central1-sosmethod-36e55.cloudfunctions.net%2Ffb%3Ffb%3D',
    client_id: 'ro.client',
    client_secret: 'secret',

    grant_type: 'password',
    scope: 'read write'
};

