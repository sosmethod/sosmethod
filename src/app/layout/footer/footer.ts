import {Component, ViewChild} from '@angular/core';
import {LayoutService} from '../layout-service';
import {MdDialog} from '@angular/material';
import {AuthGuard} from '../../dialogs/+auth/auth-guard';


@Component({
    selector: 'bc-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss']
})
export class FooterComponent {
    @ViewChild('share') share: any;
    public isTools: boolean;
    public isSecondary: boolean;

    constructor(public layout: LayoutService, public dialog: MdDialog, public auth: AuthGuard) {
        this.layout.toolsOpen.subscribe(o => this.isTools = o);
        this.layout.secondaryOpen.subscribe(o => this.isSecondary = o);
    }

    toggleTools() {
        this.layout.toolsOpen.next(!this.isTools);
    }

    toggleSecondary() {
        this.layout.secondaryOpen.next(!this.isSecondary);
    }

}
