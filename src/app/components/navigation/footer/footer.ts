import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import {LayoutService} from '../../../services/layout';
import {ContactDialogComponent} from '../../contact/contact';
import {MdDialog} from '@angular/material';
import {FaqDialogComponent} from '../../faq/faq';
import {ToolDialogComponent} from '../../tools/tool';


@Component({
    selector: 'bc-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.scss']
})
export class FooterComponent {
    @Output() showMenu = new EventEmitter();

    constructor(public layout: LayoutService, public dialog: MdDialog) {

    }

    showToolDialog(t: string) {
        this.dialog.open(ToolDialogComponent, {data: {tool: t}});
    }

    showFAQDialog() {
        this.dialog.open(FaqDialogComponent);
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

}
