import {Component, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {AuthGuard} from '../auth-guard';
import {Series} from '../../../shared/series';
import {Meditations} from '../../../shared/meditations';

@Component({
    selector: 'bc-discovery-timeline',
    templateUrl: './discovery-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class DiscoveryTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: { color: string, series: string, day: string, time: Date, url: string }[];

    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<DiscoveryTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = Object.keys(this.auth.user.completed)
            .filter(c => this.auth.user.completed[c].indexOf('_5_day') > -1 || this.auth.user.completed[c].indexOf('_11_day') > -1)
            .map(c => {
                return Series.getLinkProps(this.auth.user.completed[c], new Date(parseInt(c)));
            });

    }

    getMonth(k: number) {
        return Meditations.months[k];
    }
}

