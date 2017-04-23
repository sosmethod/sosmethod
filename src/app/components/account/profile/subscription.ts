import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';

@Component({
    selector: 'bc-subscription',
    templateUrl: './subscription.html',
    styleUrls: ['./subscription.scss']
})
export class SubscriptionComponent {
    email: string;
    private firebase: firebase.app.App;

    constructor(public router: Router,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<SubscriptionComponent>) {
        this.firebase = firebase.app();
    }

}

