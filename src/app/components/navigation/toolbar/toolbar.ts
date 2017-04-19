import {Component, Output, EventEmitter, Input, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ContactDialogComponent} from '../../contact/contact';
import {NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AccountLoginComponent} from '../../account/login/login';
import {AudioService} from '../../../services/audio';
import {AngularFire, FirebaseAuthState} from 'angularfire2';


@Component({
    selector: 'bc-toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent implements OnInit {
    @ViewChild('player') player: any;
    @Output() openMenu = new EventEmitter();
    public route$: Subject<string> = new Subject();
    public auth: FirebaseAuthState;
    public name: Subject<string> = new Subject();

    constructor(
        public af: AngularFire,
        public router: Router,
        private ref: ChangeDetectorRef,
        public dialog: MdDialog,
        public audio: AudioService
    ) {
        this.af.auth.subscribe((a) => {
            this.auth = a;
            if (a != null) {
                this.getUsers().subscribe((u) => {
                    this.name.next(u.name.first + ' ' + u.name.last);
                });
            }
        });
    }

    ngOnInit() {
        const that = this;
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                that.route$.next(e.url.split('/')[1] || 'home');
            }
        });
        setTimeout(() => {
            that.audio._audio = this.player.nativeElement;
            that.audio.AttachEvents();
        });
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

    showLoginDialog() {
        this.dialog.open(AccountLoginComponent);
    }

    getUsers(): Observable<any> {
        return this.af.database.list('/users/' + this.auth.auth.email.toLowerCase()
                .replace('.', '_').replace('$', '_').replace('/', '_').replace('#', '_')
                .replace('[', '_').replace(']', '_'))
            .flatMap((u: any) => {
                return this.af.database.object('/users/' + u[0].$value);
            });
    }
}
