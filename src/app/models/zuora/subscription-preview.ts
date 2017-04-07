

export class SubscriptionPreview {

    amount: number;

    amountWithoutTax: number;

    taxAmount: number;

    // invoiceItems: InvoiceItem[];

    constructor() {
        this.taxAmount = void 0;
        this.amount = void 0;
        this.amountWithoutTax = void 0;
    }
}
