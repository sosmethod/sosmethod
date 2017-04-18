import {Injectable} from '@angular/core';
import {
    Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {AuthUser} from '../models/auth-user';
import {Observable} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    redirect: any = null;
    resolver: any = null;
    user: AuthUser;
    auth: FirebaseAuthState;

    constructor(private router: Router, public af: AngularFire) {
        this.af.auth.subscribe((a) => {
            this.auth = a;
            if (a != null) {
                this.getUsers().subscribe((u) => {
                    this.user = u;
                });
            }
        });
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        const isLoggedIn = this.auth ? !this.auth.anonymous : false;
        const userRoles = (this.user ? this.user.roles : null) || [isLoggedIn ? 'user' : 'anonymous'];
        console.log('Roles: ' + userRoles);
        const roles = <Array<string>>route.data['roles'] || <Array<string>>route.parent.data['roles'];
        const canActivate = (roles == null || userRoles.filter((r: string) => roles.indexOf(r) !== -1).length > 0);
        console.log('GUARD: ' + (canActivate ? 'allow' : 'deny') + ' "' + route.routeConfig.path + '" ' + roles + ' ' + userRoles);
        if (this.redirect) {
            clearTimeout(this.redirect);
        }
        /*
        if (!canActivate) {
            if (isLoggedIn) {
                this.redirect = setTimeout(() => this.router.navigate(['/funnel']));
            } else {
                this.redirect = setTimeout(() => this.router.navigate(['/']));
            }
        }
        */
        return canActivate;
    }

    getUsers(): Observable<any> {
        return this.af.database.list('/users/' + this.auth.auth.email.toLowerCase()
                .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
                .replace('[', '_').replace(']', '_'))
            .flatMap((u: any) => {
                return this.af.database.object('/users/' + u[0].$value);
            });
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

}
