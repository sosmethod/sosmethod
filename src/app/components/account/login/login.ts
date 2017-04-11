import 'rxjs/add/operator/let';
import {OnInit, Component, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthUser } from '../../../models/auth-user';
import {MdDialog, MdDialogRef} from "@angular/material";


@Component({
  selector: 'bc-login-page',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class AccountLoginComponent implements OnInit {
    email: string;
    password: string;
    errorMessage: string;
    authUser = new AuthUser('', '', '', '');
    loggingIn: boolean = false;
    rememberServer: boolean;
    message: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authService: AuthService,
        public dialog: MdDialog,
        @Optional() public dialogRef?: MdDialogRef<AccountLoginComponent>) {
    }

    ngOnInit() {
        this.errorMessage = null;
    }

    login(): void {
        this.loggingIn = true;
        this.authService.login(this.authUser)
            .subscribe(isSuccess => {
                    if (isSuccess) {
                        setTimeout(() => this.router.navigate(['/home']));
                    } else {
                        this.communicateError('User login failed.');
                    }
                    this.loggingIn = false;
                },
                err => {
                    // "Response with status: 401 Unauthorized for URL:
                    // https://actforwebdev.actops.com/act.web.api/authorize"
                    if (err.mesage && err.message.indexOf('Response with status: 401 Invalid logon provided') > -1) {
                        this.communicateError('Verify user name and password');
                    } else if (err.mesage && err.message.indexOf('Response with status: 401 Unauthorized') > -1) {
                        this.communicateError('Verify database name is correct');
                    } else {
                        this.communicateError('User login failed.');
                    }
                    this.loggingIn = false;
                });
    }

    private communicateError(msg: string): void {
        this.message = msg;
    }

}
