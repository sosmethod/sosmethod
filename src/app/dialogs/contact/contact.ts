import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Http, Headers, Request} from '@angular/http';
import {AuthGuard} from '../+auth/auth-guard';
import {Environment} from '../../../../config/environment.i';


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

    constructor(public http: Http,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<ContactDialogComponent>) {
        if (this.auth.user && this.auth.user.name) {
            this.name = this.auth.user.name.first + ' ' + this.auth.user.name.last;
        }
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
            url: Environment.env.sendgridUrl,
            headers: headers,
            body: JSON.stringify(data)
        });
        this.http.request(req)
            .subscribe(() => {
                this.done = true;
            });
    }
}


