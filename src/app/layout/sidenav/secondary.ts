import {Component, Input} from '@angular/core';
import {LayoutService} from '../../services/layout';
import {MdDialog} from '@angular/material';
import {AuthGuard} from '../../dialogs/auth/auth-guard';
import {FaqDialogComponent} from '../../dialogs/faq/faq';
import {ContactDialogComponent} from '../../dialogs/contact/contact';


@Component({
    selector: 'bc-secondary-menu',
    templateUrl: './secondary.html',
    styleUrls: ['./secondary.scss']
})
export class SecondaryMenuComponent {
    @Input() public open = false;
    public isShare: boolean;

    constructor(public layout: LayoutService, public dialog: MdDialog, public auth: AuthGuard) {
        this.layout.shareOpen.subscribe(o => this.isShare = o);
    }

    showShare() {
        this.layout.secondaryOpen.next(false);
        this.layout.toolsOpen.next(false);
        this.layout.shareOpen.next(!this.isShare);
    }

    showFAQDialog() {
        this.dialog.open(FaqDialogComponent);
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

}
