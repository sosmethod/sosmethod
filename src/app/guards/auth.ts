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
    newUser: Observable<AuthUser>;

    constructor(private router: Router, public af: AngularFire) {
        this.newUser = this.af.auth.flatMap(u => this.af.database.object('/users/' + u.uid).map(s => s.val().userId));
        this.user = this.af.auth.flatMap(u => !!u ? this.getUsers(u) : null);
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {

        const roles = <Array<string>>route.data['roles'] || <Array<string>>route.parent.data['roles'];
        return this.af.auth.withLatestFrom(this.user, (token, user) => ({token, user}))
            // merge user roles with token status
            .map(({token, user}) => [token.anonymous ? 'user' : 'anonymous'].concat(token ? user.roles : []))
            // check if there are any roles that overlap to grant access
            .map(userRoles => roles == null || userRoles.filter((r: string) => roles.indexOf(r) !== -1).length > 0);
    }

    getUsers(u: FirebaseAuthState): Observable<any> {
        return this.af.database.object('/users/' + u.auth.email.toLowerCase()
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
