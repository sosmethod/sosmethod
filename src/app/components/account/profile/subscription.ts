import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {AuthGuard} from '../../../guards/auth';
import {AngularFire, FirebaseAuthState} from 'angularfire2';

@Component({
    selector: 'bc-subscription',
    templateUrl: './subscription.html',
    styleUrls: ['./subscription.scss']
})
export class SubscriptionComponent {
    email: string;
    first: string;
    last: string;
    password: string;
    newPassword: string;
    public user: FirebaseAuthState;
    private firebase: firebase.app.App;

    constructor(public router: Router,
                public auth: AuthGuard,
                public af: AngularFire,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<SubscriptionComponent>) {
        this.firebase = firebase.app();
        this.af.auth.subscribe((u) => this.user = u);
    }

    openCheckout() {

    }

    save() {
        if (this.user == null) {
            return;
        }
        const updates: any = {};
        updates['name/first'] = this.first;
        updates['name/last'] = this.last;
        this.af.database.object('/users/' + AuthGuard.escapeEmail(this.user.auth.email)).set(updates);
    }
}

