import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from '../faq/faq';
import {Http, Headers, Request} from '@angular/http';
import {environment} from '../../../../config/environment';


@Component({
    selector: 'bc-contact-dialog',
    templateUrl: './contact.html',
    styleUrls: ['./contact.scss']
})
export class ContactDialogComponent {
    public error = false;
    public done = false;
    public email = '';
    public name = '';
    public message = '';

    constructor(
        public http: Http,
        public dialog: MdDialog,
        @Optional() public dialogRef?: MdDialogRef<ContactDialogComponent>) {
    }

    send() {
        if (this.email === '' || this.message === '' || this.name === '') {
            this.error = true;
            return;
        }
        const data = {
            to: 'admin@sosmethod.com',
            subject: 'Contact Us from ' + this.name,
            from: this.email,
            body: this.name + ' writes, \n' + this.message
        };
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        const req = new Request({
            method: 'POST',
            url: environment.sendgridUrl,
            headers: headers,
            body: JSON.stringify(data)
        });

        this.http.request(req)
            .subscribe(() => {
                this.done = true;
            });
    }
}


