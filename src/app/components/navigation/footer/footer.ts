import {Component, Output, EventEmitter, Input, ChangeDetectorRef, ViewChild} from '@angular/core';
import {LayoutService} from '../../../services/layout';
import {ContactDialogComponent} from '../../contact/contact';
import {MdDialog} from '@angular/material';
import {FaqDialogComponent} from '../../faq/faq';
import {AuthUser} from '../../../models/auth-user';
import {AuthGuard} from '../../../guards/auth';


@Component({
    selector: 'bc-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss']
})
export class FooterComponent {
    @ViewChild('share') share: any;

    static isLocked(u: AuthUser, seriesUri: string) {
        if (seriesUri.indexOf('stop_drop') > -1) {
            return false;
        }
        return !u;
    }

    constructor(public layout: LayoutService, public dialog: MdDialog, public auth: AuthGuard) {
    }

    showFAQDialog() {
        this.dialog.open(FaqDialogComponent);
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

    getLocked(seriesUri: string) {
        return FooterComponent.isLocked(this.auth.user, seriesUri);
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
