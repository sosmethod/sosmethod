import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from "@angular/material";

@Component({
    selector: 'bc-forgot',
    templateUrl: './forgot.html'
})
export class ForgotPasswordComponent {
    email: string;

    constructor(public router: Router,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<ForgotPasswordComponent>) {
    }

    onNext() {
    }

}

