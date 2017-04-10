import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'bc-forgot',
    templateUrl: './forgot.html'
})
export class ForgotPasswordComponent {
    email: string;
    errorMessage: string;

    constructor(public router: Router) {
        this.errorMessage = null;
    }

    onNext() {
        this.errorMessage = null;
    }

}

