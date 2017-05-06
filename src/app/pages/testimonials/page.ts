import {Component, OnInit, ViewChild} from '@angular/core';
import 'slick-carousel';
import {TestimonialsComponent} from './testimonials';


@Component({
    selector: 'bc-testimonials-page',
    templateUrl: './page.html',
    styleUrls: ['./page.scss']
})
export class TestimonialPageComponent extends TestimonialsComponent implements OnInit {
    @ViewChild('testimonials') public testimonials: any;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

}


