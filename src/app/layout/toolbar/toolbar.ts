import {Component, Output, EventEmitter, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MdDialog} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AudioService} from '../../services/audio.service';
import {AuthGuard} from '../../dialogs/+auth/auth-guard';
import {environment} from '../../../../config/environment';
import {Http, Headers, Request} from '@angular/http';
import {DiscoverySeriesComponent} from '../../player/discovery/discovery-series';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
    selector: 'bc-toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent implements OnInit {
    @ViewChild('player') player: any;
    @Output() openMenu = new EventEmitter();
    public route$: Subject<string> = new Subject();
    public user: firebase.User;
    public playing: boolean;

    constructor(public database: AngularFireDatabase,
                public fireAuth: AngularFireAuth,
                public router: Router,
                public dialog: MdDialog,
                public http: Http,
                public audio: AudioService,
                public auth: AuthGuard) {
    }

    ngOnInit() {
        this.fireAuth.auth.onAuthStateChanged((u: firebase.User | null) => this.user = u);
        this.audio._audio = this.player.nativeElement;
        this.audio.AttachEvents();
        this.audio.state.subscribe(s => this.playing = s === 'playing');
        this.audio.ended.subscribe(() => {
            this.recordCompleted.apply(this);
        });
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                const route = e.url.split('/')[1] || 'home';
                this.route$.next(route);
                // TODO: query router config for not PlayerComponent paths?
                if (route.indexOf('_5_day') === -1 && route.indexOf('_11_day') === -1
                    && route.indexOf('meditations') === -1 && this.playing) {
                    this.audio.Pause();
                }
            }
        });
    }

    recordCompleted() {
        if (this.user == null) {
            return;
        }
        const dateKey = (new Date).getTime();
        this.database.object('/users/' + AuthGuard.escapeEmail(this.user.email)
            + '/completed/' + dateKey).set(this.router.url);
        const segments = this.router.url.split('/');
        if (segments[1] === '_5_day' && segments[2] === 'essentials') {
            const match = DiscoverySeriesComponent.seriesRegex(segments[3]);
            const day = parseInt(match[1] || match[2]);
            if (day === 5) {
                this.send5DayEmail();
            }
        }
    }

    send5DayEmail() {
        const data = {
            to: 'admin@sosmethod.com',
            from: this.user.email,
            name: this.auth.user && this.auth.user.name ? this.auth.user.name.first : null,
            body: 'This is a body',
            subject: 'The most important thing',
            return_url: window.location.origin,
            template: 'd4f3577d-4b17-4a86-8bd3-4861c6bc45c7'
        };
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        const req = new Request({
            method: 'POST',
            url: environment.sendgridUrl,
            headers: headers,
            body: JSON.stringify(data)
        });
        this.http.request(req)
            .subscribe(() => {
            });
    }

    logout() {
        const that = this;
        this.fireAuth.auth.signOut();
        setTimeout(() => that.router.navigate(['/']));
    }
}
