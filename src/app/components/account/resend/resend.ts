import {Component, Optional} from '@angular/core';
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from "@angular/material";


@Component({
    selector: 'bc-resend',
    templateUrl: './resend.html'
})
export class ResendCodeComponent {

    email: string;

    constructor(public router: Router,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<ResendCodeComponent>) {

    }

    resendCode() {
    }
}


