import {ElementRef, Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';


@Injectable()
export class LayoutService {

    sidebarOpen$: ReplaySubject<boolean> = new ReplaySubject();
    secondaryOpen: ReplaySubject<boolean> = new ReplaySubject();
    toolsOpen: ReplaySubject<boolean> = new ReplaySubject();
    shareOpen: ReplaySubject<boolean> = new ReplaySubject();
    video$: ReplaySubject<string> = new ReplaySubject();
    background: ReplaySubject<string> = new ReplaySubject();
    focusElement: ReplaySubject<ElementRef | null> = new ReplaySubject();

    constructor() {
    }

}
