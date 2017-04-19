import {ElementRef, Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";


@Injectable()
export class LayoutService {

  sidebarOpen$: Subject<boolean> = new Subject();
  video$: Subject<string> = new Subject();
  focusElement: Subject<ElementRef> = new Subject();

  constructor() {
  }

}
