import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";


@Component({
    selector: 'bc-contact-dialog',
    templateUrl: './contact.html',
    styleUrls: ['./contact.scss']
})
export class ContactDialogComponent {

    constructor(public dialogRef: MdDialogRef<ContactDialogComponent>, public dialog: MdDialog) {}

    showFaqDialog() {
        this.dialog.open(FaqDialogComponent);
    }
}