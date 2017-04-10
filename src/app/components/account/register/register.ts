import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    router: Router;
    errorMessage: string;

    constructor(router: Router) {
        this.router = router;
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


