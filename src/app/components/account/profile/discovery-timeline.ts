import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {MeditationTimelineComponent} from "./meditation-timeline";
import {Observable} from "rxjs/Observable";
import {AuthGuard} from "../../../guards/auth";

@Component({
    selector: 'bc-discovery-timeline',
    templateUrl: './discovery-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class DiscoveryTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: Observable<{time: Date, url: string}[]>;

    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<DiscoveryTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = this.auth.user.map(u => Object.keys(u.completed)
            .map(c => ({time: new Date(parseInt(c)), url: <string>u.completed[c]}))
            .filter(c => c.url.indexOf('_5_day') > -1 || c.url.indexOf('_11_day')))
    }

    getMonth(k: number) {
        return MeditationTimelineComponent.months[k];
    }
}

