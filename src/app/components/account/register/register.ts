import {Component, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {MdDialog, MdDialogRef} from '@angular/material';

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
    errorMessage: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authService: AuthService,
        public dialog: MdDialog,
        @Optional() public dialogRef?: MdDialogRef<AccountRegisterComponent>) {
        this.onInit();
    }

    onInit() {
        this.registrationUser = new RegistrationUser();
        this.errorMessage = null;
    }

    onRegister() {
        this.errorMessage = null;
    }
}


