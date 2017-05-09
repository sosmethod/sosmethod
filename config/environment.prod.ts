import {Environment} from './environment.i';

export const environment: Environment = {
    production: true,

    paymentUrl: 'https://us-central1-sosmethod-36e55.cloudfunctions.net/processPayment',
    sendgridUrl: 'https://us-central1-sosmethod-36e55.cloudfunctions.net/sendgridEmail',
    tokenUrl: 'http://localhost/identity/connect/token',
    revokeUrl: 'http://localhost/identity/connect/revocation',
    client_id: 'ro.client',
    client_secret: 'secret',

    grant_type: 'password',
    scope: 'read write'
};

