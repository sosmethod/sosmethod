// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import {Environment} from './environment.i';

export const environment: Environment = {
    production: false,

    paymentUrl: 'https://us-central1-sosmethod-36e55.cloudfunctions.net/processPayment',
    sendgridUrl: 'https://us-central1-sosmethod-36e55.cloudfunctions.net/sendgridEmail',
    tokenUrl: 'http://localhost/identity/connect/token',
    revokeUrl: 'http://localhost/identity/connect/revocation',
    client_id: 'ro.client',
    client_secret: 'secret',

    grant_type: 'password',
    scope: 'read write'
};


