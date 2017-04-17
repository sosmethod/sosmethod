import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bc-reset',
    templateUrl: './reset.html'
})
export class ForgotPassword2Component implements OnInit, OnDestroy {

    verificationCode: string;
    email: string;
    password: string;
    private sub: any;

    constructor(public router: Router, public route: ActivatedRoute) {
        console.log('email from the url: ' + this.email);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['email'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNext() {
    }

}

