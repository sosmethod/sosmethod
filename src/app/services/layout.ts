import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";


@Injectable()
export class LayoutService {

  sidebarOpen$: Subject<boolean> = new Subject();
  video$: Subject<string> = new Subject();

  constructor() {
  }

}
