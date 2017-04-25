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
    user: Observable<AuthUser>;

    constructor(private router: Router, public af: AngularFire) {
        this.user = this.af.auth
            .flatMap(u => Observable.of(!!u
                ? this.af.database.object('/users/' + AuthGuard.escapeEmail(u.auth.email))
                    .flatMap((u: any) => typeof u.oldKey != 'undefined'
                        ? this.af.database.object('/users/' + u.oldKey).map(oldUser => {
                            let user = Object.assign({}, u);
                            user.completed = Object.assign({}, oldUser.completed, user.completed);
                            return Object.assign({}, oldUser, user);
                        })
                        : u)
                : Observable.of(null)).flatMap(o => o));
    }

    static escapeEmail(email: string) {
        return email.toLowerCase()
            .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
            .replace('[', '_').replace(']', '_');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

        const roles = <Array<string>>route.data['roles'] || <Array<string>>route.parent.data['roles'];
        return this.af.auth
        // merge user roles with token status
            .flatMap((token: FirebaseAuthState) => {
                return this.user.map(user => [token && !token.anonymous ? 'user' : 'anonymous']
                    .concat(token && !token.anonymous ? (user.roles || []) : []));
            })
            // check if there are any roles that overlap to grant access
            .map(userRoles => roles == null || userRoles.filter((r: string) => roles.indexOf(r) !== -1).length > 0);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

}
