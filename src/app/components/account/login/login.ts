import 'rxjs/add/operator/let';
import {OnInit, Component, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthUser } from '../../../models/auth-user';
import {MdDialog, MdDialogRef} from "@angular/material";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {AuthGuard} from "../../../guards/auth";


@Component({
  selector: 'bc-login-page',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class AccountLoginComponent implements OnInit {
    email: string;
    password: string;
    authUser = new AuthUser();
    rememberServer: boolean;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public af: AngularFire,
        public auth: AuthGuard,
        @Optional() public dialogRef?: MdDialogRef<AccountLoginComponent>) {
    }

    ngOnInit() {
    }

    login() {
        this.af.auth.login({email: this.authUser.email, password: this.authUser.password},
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password,
            });
        this.dialog.closeAll();
    }

    loginGoogle() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }
}
