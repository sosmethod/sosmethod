import {Component, Inject, Input} from '@angular/core';
import {LayoutService} from '../layout-service';
import {MdDialog} from '@angular/material';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {DOCUMENT} from "@angular/platform-browser";


@Component({
    selector: 'bc-share-menu',
    templateUrl: './share.html',
    styleUrls: ['./share.scss']
})
export class ShareMenuComponent {
    @Input() public open = false;

    constructor(public layout: LayoutService,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Inject(DOCUMENT) private document: any) {
    }

    showSMS() {
    }

    showCopy(evt: MouseEvent) {
        if (this.document) {
            $(evt.srcElement).closest('button').find('input').val(window.location.toString()).select();
            this.document.execCommand('copy');
        }
    }
}
