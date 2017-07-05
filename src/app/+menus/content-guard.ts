import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {MdDialog} from '@angular/material';
import {AuthGuard} from '../+dialogs/+auth/auth-guard';
import {ToolsMenuComponent} from '../layout/sidenav/tools';
import {Observable} from 'rxjs/Observable';
import {Series} from '../shared/series';
import {Meditations} from '../shared/meditations';


@Injectable()
export class ContentGuard {

    constructor(public auth: AuthGuard,
                public dialog: MdDialog,
                public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        return this.redirectDialog(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    redirectDialog(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.auth.subj.map(() => {
            let pass = true;
            if (route.url.toString().indexOf('_5_day') > -1
                || route.url.toString().indexOf('_11_day') > -1) {
                pass = !Series.isLocked(this.auth.user, route.url.join('/'));
            }
            if (route.url.toString().indexOf('meditations') > -1) {
                pass = !Meditations.isLocked(this.auth.user, route.url.join('/'));
            }
            if (route.url.toString().indexOf('tool') > -1) {
                pass = !ToolsMenuComponent.isLocked(this.auth.user, route.url.join('/'));
            }
            if (!pass) {
                const that = this;
                if (!this.auth.user) {
                    setTimeout(() => that.router.navigate(['/signup']));
                }
            }
            // thou shall not
            return pass;
        });
    }
}




