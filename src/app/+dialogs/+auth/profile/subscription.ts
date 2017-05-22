import {Component, Optional, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {AuthGuard} from '../auth-guard';
import {FormGroup} from '@angular/forms';
import {Profile} from './profile-model';

@Component({
    selector: 'bc-subscription',
    templateUrl: './subscription.html',
    styleUrls: ['./subscription.scss']
})
export class SubscriptionComponent {
    private firebase: firebase.app.App;
    @Input() form: FormGroup;
    @Input() profile: Profile;

    constructor(public router: Router,
                public auth: AuthGuard,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<SubscriptionComponent>) {
        this.firebase = firebase.app();
    }

    openCheckout(title: string, amount: number) {
    }

}

