import {Component, ElementRef} from '@angular/core';
import {LayoutService} from '../services/layout';
import {AuthGuard} from '../dialogs/+auth/auth-guard';
import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'bc-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    public anonymous: Observable<boolean>;

    constructor(public layout: LayoutService, public auth: AuthGuard) {
        this.layout.focusElement.subscribe(f => this.onScrollTo(f));
        this.anonymous = this.auth.subj.map(u => u !== null);
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
