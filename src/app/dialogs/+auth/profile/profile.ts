import {Component, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {AuthGuard} from '../auth-guard';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'bc-profile',
    templateUrl: './profile.html',
    styleUrls: ['./profile.scss']
})
export class AccountProfileComponent {
    email: string;
    private firebase: firebase.app.App;
    public user: firebase.User;
    public form: FormGroup;
    public data: { first?: string, last?: string, email?: string, password?: string, newPassword?: string } = {};

    constructor(public router: Router,
                public fireAuth: AngularFireAuth,
                public builder: FormBuilder,
                public database: AngularFireDatabase,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<AccountProfileComponent>) {
        this.firebase = firebase.app();
        this.user = fireAuth.auth.currentUser;
        this.form = builder.group(this.data);
    }

    save() {
        if (this.user == null) {
            return;
        }
        const updates: any = {};
        updates['name/first'] = this.data.first;
        updates['name/last'] = this.data.last;
        this.database.object('/users/' + AuthGuard.escapeEmail(this.user.email)).set(updates);
    }
}

