import {Injectable} from '@angular/core';
import {
    Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
    Route
} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    redirect: any = null;
    resolver: any = null;

    constructor(private router: Router,
                public authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        const user = this.authService.getDecodedToken();
        const userRoles = (user ? user.roles : null) || [this.authService.isLoggedIn() ? 'user' : 'anonymous'];
        console.log('Roles: ' + userRoles);
        const roles = <Array<string>>route.data['roles'] || <Array<string>>route.parent.data['roles'];
        const canActivate = (roles == null || userRoles.filter((r: string) => roles.indexOf(r) !== -1).length > 0);
        console.log('GUARD: ' + (canActivate ? 'allow' : 'deny') + ' "' + route.routeConfig.path + '" ' + roles + ' ' + userRoles);
        if (this.redirect) {
            clearTimeout(this.redirect);
        }
        if (!canActivate) {
            if (this.authService.isLoggedIn()) {
                this.redirect = setTimeout(() => this.router.navigate(['/funnel']));
            } else {
                this.redirect = setTimeout(() => this.router.navigate(['/']));
            }
        }
        return canActivate;
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

}
