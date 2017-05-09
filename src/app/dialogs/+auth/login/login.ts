import 'rxjs/add/operator/let';
import {OnInit, Component, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthUser} from '../auth-user';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
    selector: 'bc-login-page',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class AccountLoginComponent implements OnInit {
    email: string;
    password: string;
    authUser = new AuthUser();
    error: boolean;

    constructor(public route: ActivatedRoute,
                public router: Router,
                public dialog: MdDialog,
                public fireAuth: AngularFireAuth,
                @Optional() public dialogRef?: MdDialogRef<AccountLoginComponent>) {
    }

    ngOnInit() {
    }

    login() {
        this.error = false;
        try {
            this.fireAuth.auth.signInWithEmailAndPassword(this.authUser.username, this.authUser.password)
                .then(() => this.dialog.closeAll())
                .catch(e => this.error = true);
        } catch (e) {
            this.error = true;
        }
    }

    loginGoogle() {
        this.fireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        this.dialog.closeAll();
    }

    loginTwitter() {
        this.fireAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
        this.dialog.closeAll();
    }

    loginFacebook() {
        this.fireAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
        this.dialog.closeAll();
    }
}
