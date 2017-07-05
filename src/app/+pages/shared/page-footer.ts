import {Component, ViewChild} from '@angular/core';
import {LayoutService} from '../../layout/layout-service';


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

