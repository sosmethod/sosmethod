import { Component, Input } from '@angular/core';

@Component({
    selector: 'bc-product-description',
    templateUrl: './product-description.html'
})
export class ProductDescriptionComponent {
    @Input() product: string;

    constructor() {  }

}
