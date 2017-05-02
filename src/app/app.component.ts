import 'rxjs/add/operator/let';
import { Component, ViewEncapsulation, OnInit, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LayoutService} from './services/layout';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AudioService} from './services/audio.service';
import {AngularFire} from 'angularfire2';
import {AuthGuard} from './guards/auth';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';


@Component({
  selector: 'bc-app',
  providers: [TranslateService, AudioService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

    public route: Subject<string> = new Subject();
    public isOpen: boolean;
    public inactive: Subject<boolean> = new Subject();
    private mousemove: Observable<any>;
    private timeout: any;

    constructor(
        private _zone: NgZone,
        public af: AngularFire,
        public layout: LayoutService,
        private translate: TranslateService,
        public auth: AuthGuard,
        public audio: AudioService,
        public router: Router) {
        const that = this;
        this.translate.addLangs(['en', 'fr', 'tr']);
        this.translate.setDefaultLang('en');
        this.translate.use(this.translate.currentLang || 'en');
        this.layout.sidebarOpen$.subscribe(o => this.isOpen = o);
    }

    ngOnInit() {
        const that = this;
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                that.route.next(e.url.split('/')[1] || 'home');
            }
        });
        if (window.document) {
            const self = this;
            this.mousemove = Observable.create((observer: Observer<any>) => {
                window.document.addEventListener('mousemove', (args: any) => {
                    self._zone.run(() => observer.next(args));
                });
            });
            this.mousemove.subscribe(e => {
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
        this.timeout = setTimeout(() => { that.inactive.next(true); }, 5000);
    }

    closeSidenav() {
      this.layout.sidebarOpen$.next(false);
    }

    openSidenav() {
      this.layout.sidebarOpen$.next(true);
    }

    toggleSidenav() {
        this.layout.sidebarOpen$.next(!this.isOpen);
    }
}
