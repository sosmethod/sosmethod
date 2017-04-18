import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';

@Component({
    selector: 'bc-forgot',
    templateUrl: './forgot.html'
})
export class ForgotPasswordComponent {
    email: string;
    private firebase: firebase.app.App;

    constructor(public router: Router,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<ForgotPasswordComponent>) {
        this.firebase = firebase.app();
    }

    onNext() {
        const authx = this.firebase.auth();
        return authx.sendPasswordResetEmail(this.email).then(function () {
            alert(' Email sent');
        }, function (error) {
            alert(error);
        });
    }

}

