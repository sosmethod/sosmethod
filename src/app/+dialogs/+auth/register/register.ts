import {Component, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';

export class RegistrationUser {
    name: {
        first: string,
        last: string
    } = {
        first: '',
        last: ''
    };
    email: string;
    password: string;
    company: string;
    phone: string;
}
/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    selector: 'bc-register-page',
    templateUrl: './register.html',
    styleUrls: ['./register.scss']
})
export class AccountRegisterComponent {
    registrationUser: RegistrationUser;

    constructor(public route: ActivatedRoute,
                public router: Router,
                public dialog: MdDialog,
                public af: AngularFireAuth,
                @Optional() public dialogRef?: MdDialogRef<AccountRegisterComponent>) {
        this.onInit();
    }

    onInit() {
        this.registrationUser = new RegistrationUser();
    }

    onRegister() {
        this.af.auth.createUserWithEmailAndPassword(
            this.registrationUser.email,
            this.registrationUser.password);
        this.dialog.closeAll();
    }
}


