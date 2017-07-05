import {Component, OnInit, ViewChild} from '@angular/core';
import * as jQuery from 'jquery';
import 'slick-carousel';


@Component({
    selector: 'bc-testimonials',
    templateUrl: './testimonials.html',
    styleUrls: ['./testimonials.scss']
})
export class TestimonialsComponent implements OnInit {
    @ViewChild('testimonials') public testimonials: any;

    constructor() {

    }

    ngOnInit() {
        setTimeout(() =>
        jQuery(this.testimonials.nativeElement).slick({
            dots: true,
            speed: 300,
            slidesToScroll: 2,
            slidesToShow: 2,
            swipe: true,
            draggable: true,
            touchMove: true,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            pauseOnHover: true,
            pauseOnDotsHover: true
        }));
    }

}


