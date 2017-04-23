import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {Observable} from "rxjs/Observable";
import {AuthGuard} from "../../../guards/auth";

@Component({
    selector: 'bc-meditation-timeline',
    templateUrl: './meditation-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class MeditationTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: Observable<{time: Date, url: string}[]>;
    static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<MeditationTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = this.auth.user.map(u => Object.keys(u.completed)
            .map(c => ({time: new Date(parseInt(c)), url: <string>u.completed[c]}))
            .filter(c => c.url.indexOf('meditations') > -1))
    }

    getMonth(k: number) {
        return MeditationTimelineComponent.months[k];
    }
}

