import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LayoutService} from './services/layout';


@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslateService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

    constructor(public layout: LayoutService) {
      /**
       * Selectors can be applied with the `select` operator which passes the state
       * tree to the provided selector
       */
    }

    ngOnInit() {

    }

    closeSidenav() {
      this.layout.sidebarOpen$ = Observable.of(false);
    }

    openSidenav() {
      this.layout.sidebarOpen$ = Observable.of(true);
    }

}
