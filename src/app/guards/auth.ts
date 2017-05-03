import {Injectable} from '@angular/core';
import {
    Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {AuthUser} from '../models/auth-user';
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    redirect: any = null;
    resolver: any = null;
    public user: AuthUser;
    sub: Subscription;
    subj: Subject<AuthUser>;

    constructor(private router: Router, public af: AngularFire) {
        this.subj = new ReplaySubject();
        this.af.auth.subscribe(state => {
            if(!state) {
                if (this.sub) { this.sub.unsubscribe(); }
                this.subj.next(null);
            }
            else {
                this.sub = af.database.object('/users/' + AuthGuard.escapeEmail(state.auth.email))
                    .flatMap(user => {
                        return state && user && user.oldKey != 'undefined'
                            ? af.database.object('/users/' + user.oldKey).map(oldUser => {
                                const origUser = Object.assign({}, user);
                                origUser.completed = Object.assign({}, oldUser.completed, user.completed);
                                return Object.assign({}, oldUser, origUser);
                            })
                            : Observable.of(user)
                    })
                    .subscribe(u => this.subj.next(u));
            }
        });
        this.subj.subscribe(u => this.user = u);
    }

    static escapeEmail(email: string) {
        return email.toLowerCase()
            .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
            .replace('[', '_').replace(']', '_');
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
