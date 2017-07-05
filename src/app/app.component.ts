import 'rxjs/add/operator/let';
import {Component, ViewEncapsulation, OnInit, NgZone, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LayoutService} from './layout/layout-service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AudioService} from './layout/audio.service';
import {AuthGuard} from './+dialogs/+auth/auth-guard';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {MdDialog} from '@angular/material';
import {AsyncPipe} from '@angular/common';
import {DOCUMENT} from '@angular/platform-browser';
import {MetaService} from './shared/meta-service';


@Component({
    selector: 'bc-app',
    providers: [TranslateService, AsyncPipe, MetaService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

    public route: Subject<string> = new Subject();
    public isOpen: boolean;
    public isShare: boolean;
    public isSecondary: boolean;
    public isTools: boolean;
    public openDialog: boolean;
    public inactive: ReplaySubject<boolean> = new ReplaySubject();
    private mousemove: Observable<any>;
    private timeout: any;

    constructor(private _zone: NgZone,
                public layout: LayoutService,
                private translate: TranslateService,
                public auth: AuthGuard,
                public dialog: MdDialog,
                public audio: AudioService,
                public router: Router,
                @Inject(DOCUMENT) private document: any) {
        this.translate.addLangs(['en', 'fr', 'tr']);
        this.translate.setDefaultLang('en');
        this.translate.use(this.translate.currentLang || 'en');
        this.layout.sidebarOpen.subscribe(o => this.isOpen = o);
        this.layout.shareOpen.subscribe(o => this.isShare = o);
        this.layout.secondaryOpen.subscribe(o => this.isSecondary = o);
        this.layout.toolsOpen.subscribe(o => this.isTools = o);
        this.router.events.filter(e => e instanceof NavigationStart)
            .subscribe((e: NavigationStart) => {
                this.activate(null);
            });
        this.dialog.afterOpen.subscribe(() => this.openDialog = true);
        this.dialog.afterAllClosed.subscribe(() => this.openDialog = false);
    }

    ngOnInit() {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                let urlClass = e.url.split(/[\/#?]/ig)[1];
                if (typeof urlClass === 'undefined' || urlClass.trim() === '' || urlClass === null) {
                    urlClass = 'home';
                }
                this.route.next(urlClass);
            }
        });
        if (this.document) {
            const self = this;
            this.mousemove = Observable.create((observer: Observer<any>) => {
                this.document.addEventListener('mousemove', (args: any) => {
                    self._zone.run(() => observer.next(args));
                });
            });
            this.mousemove.subscribe(() => {
                this.onMouseMove();
            });
            this.onMouseMove();
        }
    }

    onMouseMove() {
        const that = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.inactive.next(false);
        }
        this.timeout = setTimeout(() => {
            that.inactive.next(true);
        }, 5000);
    }

    closeSidenav() {
        this.layout.sidebarOpen.next(false);
    }

    openSidenav() {
        this.layout.sidebarOpen.next(true);
    }

    toggleSidenav() {
        if (this.isShare) {
            this.layout.shareOpen.next(false);
        }
        if (this.isSecondary) {
            this.layout.secondaryOpen.next(false);
        }
        if (this.isTools) {
            this.layout.toolsOpen.next(false);
        }
        this.layout.sidebarOpen.next(!this.isOpen);
    }

    activate(event: any) {
        if (event) {
            event.stopPropagation();
        }
        if (this.isShare) {
            this.layout.shareOpen.next(false);
        }
        if (this.isSecondary) {
            this.layout.secondaryOpen.next(false);
        }
        if (this.isOpen) {
            this.closeSidenav();
        }
        if (this.isTools) {
            this.layout.toolsOpen.next(false);
        }
        this.onMouseMove();
    }
}
