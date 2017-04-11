import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";


@Component({
    selector: 'bc-contact-dialog',
    templateUrl: './contact.html',
    styleUrls: ['./contact.scss']
})
export class ContactDialogComponent {

    constructor(public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<ContactDialogComponent>) {}

    showFaqDialog() {
        this.dialog.closeAll();
        this.dialog.open(FaqDialogComponent);
    }
}