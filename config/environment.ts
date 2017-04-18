// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,

    tokenUrl: 'http://localhost/identity/connect/token',
    revokeUrl: 'http://localhost/identity/connect/revocation',
    client_id: 'ro.client',
    client_secret: 'secret',

    grant_type: 'password',
    scope: 'read write',

    firebase: {
        apiKey: 'AIzaSyCqhdstV83rISzeWGyJy0DDhdeBAByWxtU',
        authDomain: 'sosmethod-36e55.firebaseapp.com',
        databaseURL: 'https://sosmethod-36e55.firebaseio.com',
        projectId: 'sosmethod-36e55',
        storageBucket: 'sosmethod-36e55.appspot.com',
        messagingSenderId: '216534622213'
    }
};
