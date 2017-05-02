import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from '../faq/faq';
import {Http} from '@angular/http';
import {environment} from '../../../../config/environment';


@Component({
    selector: 'bc-contact-dialog',
    templateUrl: './contact.html',
    styleUrls: ['./contact.scss']
})
export class ContactDialogComponent {
    public error = false;
    public email = '';
    public name = '';
    public message = '';

    constructor(
        public http: Http,
        public dialog: MdDialog,
        @Optional() public dialogRef?: MdDialogRef<ContactDialogComponent>) {}

    showFaqDialog() {
        this.dialog.closeAll();
        this.dialog.open(FaqDialogComponent);
    }

    send() {
        if (this.email === '' || this.message === '' || this.name === '') {
            this.error = true;
            return;
        }

        this.http.post(environment.sendgridUrl, {
            to: this.email,
            body: this.name + ' writes: \n' + this.message
        }).subscribe();
    }
}


