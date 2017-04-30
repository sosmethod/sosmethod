import {Component, Output, EventEmitter, Input, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ContactDialogComponent} from '../../contact/contact';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AccountLoginComponent} from '../../account/login/login';
import {AudioService} from '../../../services/audio';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {AuthGuard} from "../../../guards/auth";
import {AuthUser} from "../../../models/auth-user";


@Component({
    selector: 'bc-toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent implements OnInit {
    @ViewChild('player') player: any;
    @Output() openMenu = new EventEmitter();
    public route$: Subject<string> = new Subject();
    public user: FirebaseAuthState;
    public playing: boolean;

    constructor(
        public af: AngularFire,
        public router: Router,
        private ref: ChangeDetectorRef,
        public dialog: MdDialog,
        public audio: AudioService,
        public auth: AuthGuard
    ) {

    }

    ngOnInit() {
        this.af.auth.subscribe((u) => this.user = u);
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
        let dateKey = (new Date).getTime();
        let updates: any = {};
        updates[dateKey] = this.router.url;
        this.af.database.object('/users/' + AuthGuard.escapeEmail(this.user.auth.email) + '/completed/').set(updates);
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

    showLoginDialog() {
        this.dialog.open(AccountLoginComponent);
    }

    logout() {
        const that = this;
        this.af.auth.logout();
        setTimeout(() => that.router.navigate(['/']));
    }
}
