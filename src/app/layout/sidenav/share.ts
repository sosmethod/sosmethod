import {Component, Input} from '@angular/core';
import {LayoutService} from '../../services/layout';
import {MdDialog} from '@angular/material';
import {AuthGuard} from '../../dialogs/auth/auth-guard';


@Component({
    selector: 'bc-share-menu',
    templateUrl: './share.html',
    styleUrls: ['./share.scss']
})
export class ShareMenuComponent {
    @Input() public open = false;

    constructor(public layout: LayoutService, public dialog: MdDialog, public auth: AuthGuard) {
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
