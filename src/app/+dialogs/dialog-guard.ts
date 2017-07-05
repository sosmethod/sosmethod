import {Injectable, Type} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, Route} from '@angular/router';
import {MdDialog} from '@angular/material';


@Injectable()
export class DialogGuard {

    constructor(public dialog: MdDialog,
                public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        return this.redirectDialog(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    redirectDialog(route: ActivatedRouteSnapshot) {
        const component = route.component;
        const that = this;
        if (route.routeConfig && this.router.config.filter(c => c && c.component && c.component === component
            || this.isChild(c, component, route)
            || this.isLoadedRemote(c, component, route)).length > 0) {
            that.dialog.closeAll();
            that.dialog.open(<any>component, {data: route});
            if (!this.router.navigated) {
                this.router.navigate(['/']);
            }
            return false;
        }
        return true;
    }

    isChild(c: Route, component: string | Type<any>, route: ActivatedRouteSnapshot) {
        return c && c.children && c.children.filter(r =>
            r && r.component && r.path
            && r.component === component
            && r.path === route.routeConfig.path).length > 0;
    }

    isLoadedRemote(c: any, component: string | Type<any>, route: ActivatedRouteSnapshot) {
        return typeof c !== 'undefined' && typeof c._loadedConfig !== 'undefined'
            && typeof c._loadedConfig.routes !== 'undefined' && c._loadedConfig.routes.filter((r: Route) => {
                return typeof r !== 'undefined' && typeof r.component !== 'undefined'
                    && typeof r.path !== 'undefined'
                    && r.component === component
                    && r.path === route.routeConfig.path;
            }).length > 0;
    }
}




