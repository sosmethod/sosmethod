import { RatePlan } from './rate-plan';

export class Subscription {

    id: string;

    termType: string;

    accountName: string;

    status: number;

    ratePlans: RatePlan[];

    constructor() {
        this.id = void 0;
        this.termType = void 0;
        this.accountName = void 0;
        this.status = void 0;
        this.ratePlans = void 0;
    }
}
