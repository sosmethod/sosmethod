import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {MdDialog} from "@angular/material";
import {AuthGuard} from "./auth";
import {DiscoveryComponent} from "../components/navigation/discovery/discovery";
import {MeditationComponent} from "../components/navigation/meditation/meditation";
import {FooterComponent} from "../components/navigation/footer/footer";
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ContentGuard {

    constructor(
        public auth: AuthGuard,
        public af: AngularFire,
        public dialog: MdDialog,
        public router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
        return this.redirectDialog(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    redirectDialog(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.auth.subj.map(u => {
            let pass = true;
            if (route.url.toString().indexOf('_5_day') > -1 || route.url.toString().indexOf('_11_day') > -1) {
                pass = !DiscoveryComponent.isLocked(this.auth.user, route.url.toString());
            }
            if (route.url.toString().indexOf('meditations') > -1) {
                pass = !MeditationComponent.isLocked(this.auth.user, route.url.toString());
            }
            if (route.url.toString().indexOf('tool') > -1) {
                pass = !FooterComponent.isLocked(this.auth.user, route.url.toString());
            }
            if (!pass) {
                const that = this;
                if (!u) {
                    setTimeout(() => that.router.navigate(['/signup']));
                }
            }
            // thou shall not
            return pass;
        });
    }
}




