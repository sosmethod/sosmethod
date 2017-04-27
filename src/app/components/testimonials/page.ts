import {Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild} from '@angular/core';
import * as jQuery from 'jquery';
import 'slick-carousel';
import {TestimonialsComponent} from "./testimonials";


@Component({
    selector: 'bc-testimonials-page',
    templateUrl: './page.html',
    styleUrls: ['./page.scss']
})
export class TestimonialPageComponent extends TestimonialsComponent implements OnInit {
    @ViewChild ('testimonials') public testimonials: any;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

}


