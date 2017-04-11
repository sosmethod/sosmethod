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
        console.log();
        if (route.routeConfig && this.router.config.filter(c => c && c.component && c.component === that
            || c && c.children && c.children.filter(r =>
            r && r.component && r.path
            && r.component === that
            && r.path === route.routeConfig.path).length > 0).length > 0) {
            setTimeout(() => {
                this.router.navigate(['']);
                this.dialog.closeAll();
                this.dialog.open(<any>that);
            });
            return false;
        }
        return true;
    }
}




