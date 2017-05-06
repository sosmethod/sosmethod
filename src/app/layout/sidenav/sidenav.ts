import {Component, Input} from '@angular/core';
import {LayoutService} from '../../services/layout';

@Component({
    selector: 'bc-sidenav',
    templateUrl: './sidenav.html',
    styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
    @Input() open = false;

    constructor(public layout: LayoutService) {
    }

    setVideoSource(v: string, b: string) {
        this.layout.video$.next(v);
        this.layout.background.next(b);
    }

}
