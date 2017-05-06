import {Component, ViewChild} from '@angular/core';
import {LayoutService} from '../../services/layout';


@Component({
    selector: 'bc-page-footer',
    templateUrl: './page-footer.html',
    styleUrls: ['./page-footer.scss']
})
export class StaticFooterComponent {
    @ViewChild('testimonials') public testimonials: any;

    constructor(public layout: LayoutService) {
    }

    date() {
        return (new Date).getFullYear();
    }

    returnToTop(evt: any) {
        this.layout.focusElement.next(null);
    }
}

