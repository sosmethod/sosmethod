import {Component, ViewChild} from '@angular/core';
import {LayoutService} from '../../services/layout';
import {ContactDialogComponent} from '../../dialogs/contact/contact';
import {MdDialog} from '@angular/material';
import {FaqDialogComponent} from '../../dialogs/faq/faq';
import {AuthGuard} from '../../dialogs/auth/auth-guard';


@Component({
    selector: 'bc-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss']
})
export class FooterComponent {
    @ViewChild('share') share: any;
    public isTools: boolean;

    constructor(public layout: LayoutService, public dialog: MdDialog, public auth: AuthGuard) {
        this.layout.toolsOpen.subscribe(o => this.isTools = o);
    }

    toggleTools() {
        this.layout.toolsOpen.next(!this.isTools);
    }

    showFAQDialog() {
        this.dialog.open(FaqDialogComponent);
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

    showSMS() {
    }

    showCopy(evt: MouseEvent) {
        if (window.document) {
            $(evt.srcElement).closest('button').find('input').val(window.location.toString()).select();
            window.document.execCommand('copy');
        }
    }
}
