import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';

@Component({
    selector: 'bc-profile',
    templateUrl: './profile.html',
    styleUrls: ['./profile.scss']
})
export class AccountProfileComponent {
    email: string;
    private firebase: firebase.app.App;

    constructor(public router: Router,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<AccountProfileComponent>) {
        this.firebase = firebase.app();
    }

}

