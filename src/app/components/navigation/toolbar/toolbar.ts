import {Component, Output, EventEmitter, Input, ChangeDetectorRef, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ContactDialogComponent} from '../../contact/contact';
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AccountLoginComponent} from "../../account/login/login";


@Component({
    selector: 'bc-toolbar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent implements OnInit {
    @Output() openMenu = new EventEmitter();
    public route$: Subject<string> = new Subject();

    constructor(public router: Router, private ref: ChangeDetectorRef, public dialog: MdDialog) {

    }

    ngOnInit() {
        const that = this;
        this.router.events.subscribe((e) => {
            that.route$.next(e.url.split('/')[1] || 'home');
        });
    }

    showContactDialog() {
        this.dialog.open(ContactDialogComponent);
    }

    showLoginDialog() {
        this.dialog.open(AccountLoginComponent);
    }
}
