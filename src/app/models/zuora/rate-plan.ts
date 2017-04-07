import { RatePlanCharge } from './rate-plan-charge';

export class RatePlan {

    type: string;

    subType: string;

    id: string;

    productId: string;

    name: string;

    ratePlanCharges: RatePlanCharge[];

    constructor() {
        this.id = void 0;
        this.productId = void 0;
        this.type = void 0;
        this.subType = void 0;
        this.name = void 0;
        this.ratePlanCharges = void 0;
    }
}


