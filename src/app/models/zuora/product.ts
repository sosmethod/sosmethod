import { RatePlan } from './rate-plan';


export class Product {

    type: string;

    id: string;

    name: string;

    description: string;

    ratePlans: RatePlan[];

    constructor() {
        this.id = void 0;
        this.name = void 0;
        this.type = void 0;
        this.description = void 0;
        this.ratePlans = void 0;
    }
}
