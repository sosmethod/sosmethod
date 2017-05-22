import {Component, OnInit, ViewChild} from '@angular/core';
import {TestimonialsComponent} from '../shared/testimonials';


@Component({
    selector: 'bc-gift-testimonials',
    templateUrl: './gift-testimonials.html',
    styleUrls: ['../shared/testimonials.scss']
})
export class GiftTestimonialsComponent extends TestimonialsComponent implements OnInit {
    @ViewChild('testimonials') public testimonials: any;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

}


