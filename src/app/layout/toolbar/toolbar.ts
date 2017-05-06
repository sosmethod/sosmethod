import {Component, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ContactDialogComponent} from '../../dialogs/contact/contact';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AccountLoginComponent} from '../../dialogs/auth/login/login';
import {AudioService} from '../../services/audio.service';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {AuthGuard} from '../../dialogs/auth/auth-guard';
import {AsyncPipe} from '@angular/common';


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

    constructor(public af: AngularFire,
                public router: Router,
                public dialog: MdDialog,
                public audio: AudioService,
                public auth: AuthGuard) {
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
        const dateKey = (new Date).getTime();
        this.af.database.object('/users/' + AuthGuard.escapeEmail(this.user.auth.email) + '/completed/' + dateKey).set(this.router.url);
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
