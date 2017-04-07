import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()
export class CanActivateTeam implements CanActivate, CanActivateChild {
    redirect: any = null;
    resolver: any = null;

    constructor(
        private router: Router,
        public authService: AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
            return true;
            /*
        var that = this;
        const isSecured = route.routeConfig.path === 'home' || route.parent != null
            && route.parent.routeConfig.path === 'home';
        const canActivate = isSecured && that.authService.isLoggedIn() || !isSecured && !that.authService.isLoggedIn();
        console.log('GUARD: ' + (canActivate ? 'allow' : 'deny') + ' "' + route.routeConfig.path + '"');
        if (that.redirect) {
            clearTimeout(that.redirect);
        }
        if (!canActivate) {
            if (route.routeConfig.path === '') {
                that.redirect = setTimeout(() => that.router.navigate(['/home']));
            } else {
                that.redirect = setTimeout(() => that.router.navigate(['/**error400']));
            }
        }
        return canActivate;
        */
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.canActivate(route, state);
    }

}
