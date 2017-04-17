import {Component, Output, EventEmitter, Input, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ContactDialogComponent} from '../../contact/contact';
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AccountLoginComponent} from "../../account/login/login";
import {AudioService} from "../../../services/audio";
import {AngularFire} from "angularfire2";


@Component({
    selector: 'bc-toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent implements OnInit {
    @ViewChild('player') player: any;
    @Output() openMenu = new EventEmitter();
    public route$: Subject<string> = new Subject();

    constructor(
        public af: AngularFire,
        public router: Router,
        private ref: ChangeDetectorRef,
        public dialog: MdDialog,
        public audio: AudioService
    ) {

    }

    ngOnInit() {
        const that = this;
        this.router.events.subscribe((e) => {
            that.route$.next(e.url.split('/')[1] || 'home');
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
}
