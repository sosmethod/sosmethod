import { Component } from '@angular/core';
import {LayoutService} from '../../../services/layout';


@Component({
  selector: 'bc-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent {
  public sidebarOpen: boolean;

  constructor(public layout: LayoutService) {
    this.layout.sidebarOpen$.subscribe((o) => this.sidebarOpen = o);
  }

  openSidenav() {
    if(this.sidebarOpen) {
      this.layout.sidebarOpen$.next(false);
    }
    else {
      this.layout.sidebarOpen$.next(true);
    }
  }

}
