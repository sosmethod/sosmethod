import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'bc-confirm-page',
    templateUrl: './confirm.html'
})
export class AccountConfirmComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    private sub: any;

    constructor(public router: Router, public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['username'];

        });

        this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onConfirmRegistration() {
        this.errorMessage = null;
    }
}

