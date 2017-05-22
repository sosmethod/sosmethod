import {Component, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MdDialog} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AudioService} from '../audio.service';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {Http, Headers, Request} from '@angular/http';
import {DiscoverySeriesComponent} from '../../+player/discovery/discovery-series';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Environment} from '../../../../config/environment.i';
import {Series} from "../../shared/series";


@Component({
    selector: 'bc-toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent implements OnInit {
    @ViewChild('player') player: any;
    @Output() openMenu = new EventEmitter();
    public route: Subject<string> = new Subject();
    public user: firebase.User;
    public photo: string;
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
        this.fireAuth.auth.onAuthStateChanged((u: firebase.User | null) => {
            this.user = u;
            if (this.user != null
                && typeof this.user.providerData !== 'undefined' && typeof this.user.providerData[0] !== 'undefined') {
                this.photo = this.user.providerData[0].photoURL;
            }
        });
        this.audio._audio = this.player.nativeElement;
        this.audio.AttachEvents();
        this.audio.state.subscribe(s => this.playing = s === 'playing');
        this.audio.ended.subscribe(() => {
            this.recordCompleted.apply(this);
        });
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                const route = e.url.split('/')[1] || 'home';
                this.route.next(route);
                // TODO: query router config for not PlayerComponent paths?
                if (route.indexOf('play') === -1 && this.playing) {
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
        const completed = Object.keys(this.auth.user.completed).map(k => this.auth.user.completed[k]);
        this.database.object('/users/' + AuthGuard.escapeEmail(this.user.email)
            + '/completed/' + dateKey).set(this.router.url);
        const segments = this.router.url.split('/');
        if (segments[1] === '_5_day' && segments[2] === 'essentials') {
            const match = Series.seriesRegex(segments[3]);
            const day = parseInt(match[1] || match[2]);
            const isNew = completed.indexOf(this.router.url) === -1;
            if (day === 5 && isNew) {
                this.send1DayEmail();
                this.send5DayEmail();
                this.send12DayEmail();
            }
        }
    }

    send1DayEmail() {
        const OneDay = new Date;
        OneDay.setHours(8);
        OneDay.setDate(OneDay.getDate() + 1);
        const data = {
            to: this.user.email,
            from: 'hello@thesosmethod.com',
            name: this.auth.user && this.auth.user.name ? this.auth.user.name.first : null,
            body: 'This is a body',
            subject: 'The most important thing',
            return_url: window.location.origin,
            template: 'd4f3577d-4b17-4a86-8bd3-4861c6bc45c7',
            send_at: OneDay.getTime() / 1000
        };
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        const req = new Request({
            method: 'POST',
            url: Environment.env.sendgridUrl,
            headers: headers,
            body: JSON.stringify(data)
        });
        this.http.request(req)
            .subscribe(() => {
            });
    }

    send5DayEmail() {
        const OneDay = new Date;
        OneDay.setHours(8);
        OneDay.setDate(OneDay.getDate() + 5);
        const data = {
            to: this.user.email,
            from: 'hello@thesosmethod.com',
            name: this.auth.user && this.auth.user.name ? this.auth.user.name.first : null,
            body: 'This is a body',
            subject: 'We are so impressed!',
            return_url: window.location.origin,
            template: '250347ad-f8d3-4e8a-a93b-9b8a4b461375',
            send_at: OneDay.getTime() / 1000
        };
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        const req = new Request({
            method: 'POST',
            url: Environment.env.sendgridUrl,
            headers: headers,
            body: JSON.stringify(data)
        });
        this.http.request(req)
            .subscribe(() => {
            });
    }

    send12DayEmail() {
        const OneDay = new Date;
        OneDay.setHours(8);
        OneDay.setDate(OneDay.getDate() + 12);
        const data = {
            to: this.user.email,
            from: 'hello@thesosmethod.com',
            name: this.auth.user && this.auth.user.name ? this.auth.user.name.first : null,
            body: 'This is a body',
            subject: '5 is the magic number',
            return_url: window.location.origin,
            template: '2cc77cb5-27c0-4f3e-8012-5b0b3ad54015',
            send_at: OneDay.getTime() / 1000
        };
        const headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        const req = new Request({
            method: 'POST',
            url: Environment.env.sendgridUrl,
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
