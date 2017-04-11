import {Injectable} from "@angular/core";
import {AccountLoginComponent} from "../components/account/login/login";
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {MdDialog} from "@angular/material";


@Injectable()
export class DialogGuard {

    constructor(
        public dialog: MdDialog,
        public router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        return this.redirectDialog(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    redirectDialog(route: ActivatedRouteSnapshot) {
        const that = route.component;
        setTimeout(() => {
            this.router.navigate(['']);
            this.dialog.closeAll();
            this.dialog.open(<any>that);
        });
        return false;
    }
}




