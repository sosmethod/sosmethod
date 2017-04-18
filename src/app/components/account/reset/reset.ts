import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFire, AngularFireAuth, FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import {environment} from '../../../../../config/environment';

@Component({
    selector: 'bc-reset',
    templateUrl: './reset.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    verificationCode: string;
    email: string;
    password: string;
    private sub: any;
    private firebase: firebase.app.App;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public af: AngularFire) {
        console.log('email from the url: ' + this.email);
        this.firebase = firebase.initializeApp(environment.firebase);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['email'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    resetPassword(email: string) {
        const auth = this.firebase.auth();
        // Verify the password reset code is valid.
        auth.verifyPasswordResetCode(actionCode).then(function(email) {
            var accountEmail = email;

            // TODO: Show the reset screen with the user's email and ask the user for
            // the new password.

            // Save the new password.
            auth.confirmPasswordReset(actionCode, newPassword).then(function(resp) {
                // Password reset has been confirmed and new password updated.

                // TODO: Display a link back to the app, or sign-in the user directly
                // if the page belongs to the same domain as the app:
                // auth.signInWithEmailAndPassword(accountEmail, newPassword);
            }).catch(function(error) {
                // Error occurred during confirmation. The code might have expired or the
                // password is too weak.
            });
        }).catch(function(error) {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
        });
    }
}

