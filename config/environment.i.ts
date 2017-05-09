export interface Environment {
    production: boolean;
    paymentUrl: string;
    sendgridUrl: string;
    tokenUrl: string;
    revokeUrl: string;
    client_id: string;
    client_secret: string;
    grant_type: string;
    scope: string;
}
