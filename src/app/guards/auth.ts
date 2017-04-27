import {Injectable} from '@angular/core';
import {
    Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {AuthUser} from '../models/auth-user';
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    redirect: any = null;
    resolver: any = null;
    public user: AuthUser;
    sub: Subscription;

    constructor(private router: Router, public af: AngularFire) {
        let subj: Subject<AuthUser> = new Subject();
        subj.next(new AuthUser());
        this.af.auth.subscribe(state => {
            if(!state) {
                if (this.sub) this.sub.unsubscribe();
                subj.next(null);
            }
            else {
                this.sub = af.database.object('/users/' + AuthGuard.escapeEmail(state.auth.email))
                    .flatMap(user => {
                        return state && user && user.oldKey != 'undefined'
                            ? af.database.object('/users/' + user.oldKey).map(oldUser => {
                                let origUser = Object.assign({}, user);
                                origUser.completed = Object.assign({}, oldUser.completed, user.completed);
                                return Object.assign({}, oldUser, origUser);
                            })
                            : Observable.of(user)
                    })
                    .subscribe(u => subj.next(u));
            }
        });
        subj.subscribe(u => this.user = u);
    }

    static escapeEmail(email: string) {
        return email.toLowerCase()
            .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
            .replace('[', '_').replace(']', '_');
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        const roles = <Array<string>>route.data['roles'] || <Array<string>>route.parent.data['roles'];
        return roles == null || (this.user
                ? ['user'].concat(this.user.roles || [])
                : ['anonymous'])
                .filter((r: string) => roles.indexOf(r) !== -1).length > 0
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

}
