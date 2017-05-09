import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthUser} from './auth-user';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    public user: AuthUser;
    subj: Observable<AuthUser>;

    static escapeEmail(email: string) {
        return email.toLowerCase()
            .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
            .replace('[', '_').replace(']', '_');
    }

    constructor(public fireAuth: AngularFireAuth, public database: AngularFireDatabase) {
        const state = this.fireAuth.auth.currentUser;
        if (!state) {
            this.subj = Observable.of(null);
        } else {
            this.subj = database.object('/users/' + AuthGuard.escapeEmail(state.email))
                .flatMap(user => {
                    return state && user && typeof user.oldKey !== 'undefined'
                        ? database.object('/users/' + user.oldKey).map(oldUser => {
                            const origUser = Object.assign({}, user);
                            origUser.completed = Object.assign({}, oldUser.completed, user.completed);
                            return Object.assign({}, oldUser, origUser);
                        })
                        : Observable.of(user);
                });
        }
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
        const roles = <Array<string>>route.data['roles'] || <Array<string>>route.parent.data['roles'];
        return this.subj.map(() => roles == null || (this.user
            ? ['user'].concat(this.user.roles || [])
            : ['anonymous'])
            .filter((r: string) => roles.indexOf(r) !== -1).length > 0);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

}
