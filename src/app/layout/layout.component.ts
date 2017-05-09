import {Component, ElementRef} from '@angular/core';
import {LayoutService} from '../services/layout';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
    selector: 'bc-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    public anonymous: boolean;

    constructor(public layout: LayoutService, public af: AngularFireAuth) {
        this.layout.focusElement.subscribe(f => this.onScrollTo(f));
        this.anonymous = !this.af.auth.currentUser;
    }

    onScrollTo(el: ElementRef) {
        if (el) {
            const discovery = $(el.nativeElement);
            const wrapper = discovery.parents('.mat-sidenav-content');
            wrapper.stop().animate({
                scrollTop: discovery.offset().top + wrapper.scrollTop() - (wrapper.outerHeight() / 2 - discovery.outerHeight(false) / 2),
                scrollLeft: discovery.offset().left + wrapper.scrollLeft() - (wrapper.outerWidth() / 2 - discovery.outerWidth(false) / 2)
            }, 350);
        } else {
            $(window.document.body).stop().animate({
                scrollTop: 0,
                scrollLeft: 0
            }, 350);
        }
    }

}
