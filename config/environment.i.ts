export interface IEnvironment {
    production: boolean;
    paymentUrl: string;
    sendgridUrl: string;
    tokenUrl: string;
    revokeUrl: string;
    fbUrl: string;
    twUrl: string;
    client_id: string;
    client_secret: string;
    grant_type: string;
    scope: string;
}

export abstract class Environment implements IEnvironment {
    production: boolean;
    paymentUrl: string;
    sendgridUrl: string;
    tokenUrl: string;
    revokeUrl: string;
    fbUrl: string;
    twUrl: string;
    client_id: string;
    client_secret: string;
    grant_type: string;
    scope: string;
    static env: Environment;
}


