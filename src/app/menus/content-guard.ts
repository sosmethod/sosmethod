import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {MdDialog} from '@angular/material';
import {AuthGuard} from '../dialogs/+auth/auth-guard';
import {DiscoveryComponent} from './discovery/discovery';
import {MeditationComponent} from './meditation/meditation';
import {ToolsMenuComponent} from '../layout/sidenav/tools';


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

    redirectDialog(route: ActivatedRouteSnapshot): boolean {
        let pass = true;
        if (route.url.toString().indexOf('_5_day') > -1 || route.url.toString().indexOf('_11_day') > -1) {
            pass = !DiscoveryComponent.isLocked(this.auth.user, route.url.toString());
        }
        if (route.url.toString().indexOf('meditations') > -1) {
            pass = !MeditationComponent.isLocked(this.auth.user, route.url.toString());
        }
        if (route.url.toString().indexOf('tool') > -1) {
            pass = !ToolsMenuComponent.isLocked(this.auth.user, route.url.toString());
        }
        if (!pass) {
            const that = this;
            if (!this.auth.user) {
                setTimeout(() => that.router.navigate(['/signup']));
            }
        }
        // thou shall not
        return pass;
    }
}




