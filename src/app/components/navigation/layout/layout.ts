import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {LayoutService} from '../../../services/layout';
import {AngularFire} from "angularfire2";


@Component({
  selector: 'bc-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent {
  public sidebarOpen: boolean;

  constructor(public layout: LayoutService, public af: AngularFire) {
    this.layout.sidebarOpen$.subscribe((o) => this.sidebarOpen = o);
    this.layout.focusElement.subscribe(this.onScrollTo);
  }

  openSidenav() {
    if (this.sidebarOpen) {
      this.layout.sidebarOpen$.next(false);
    }
    else {
      this.layout.sidebarOpen$.next(true);
    }
  }

  onScrollTo(el: ElementRef) {
    const discovery = $(el.nativeElement);
    const wrapper = discovery.parents('.mat-sidenav-content');
    wrapper.stop().animate({
      scrollTop: discovery.offset().top + wrapper.scrollTop() - (wrapper.outerHeight() / 2 - discovery.outerHeight(false) / 2),
      scrollLeft: discovery.offset().left + wrapper.scrollLeft() - (wrapper.outerWidth() / 2 - discovery.outerWidth(false) / 2)
    }, 350);
  }

}
