import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'bc-resend',
    templateUrl: './resend.html'
})
export class ResendCodeComponent {

    email: string;
    errorMessage: string;

    constructor(public router: Router) {

    }

    resendCode() {
    }
}


