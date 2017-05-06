import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {MeditationTimelineComponent} from "./meditation-timeline";
import {Observable} from "rxjs/Observable";
import {AuthGuard} from "../auth-guard";
import {DiscoverySeriesComponent} from "../../../player/discovery/discovery-series";

@Component({
    selector: 'bc-discovery-timeline',
    templateUrl: './discovery-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class DiscoveryTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: {color: string, series: string, day: string, time: Date, url: string}[];

    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<DiscoveryTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = Object.keys(this.auth.user.completed)
            .filter(c => this.auth.user.completed[c].indexOf('_5_day') > -1 || this.auth.user.completed[c].indexOf('_11_day') > -1)
            .map(c => {
                const match = DiscoverySeriesComponent.seriesRegex(this.auth.user.completed[c].split('/').pop());
                const day = 'DISCOVERY.SUBTEXT.'
                    + (this.auth.user.completed[c].indexOf('_11_day') > -1 ? '_11_day' : '_5_day')
                    + '_' + this.auth.user.completed[c].split('/')[2]
                    + '._day_' + parseInt(match[1] || match[2]);
                const series = 'DISCOVERY.TITLE.'
                    + (this.auth.user.completed[c].indexOf('_11_day') > -1 ? '_11_day' : '_5_day')
                    + '_' + this.auth.user.completed[c].split('/')[2];
                return {
                    color: 'sos-circle ' + DiscoverySeriesComponent.colorSeries[this.auth.user.completed[c].split('/')[2]],
                    series: series,
                    day: day,
                    time: new Date(parseInt(c)),
                    url: <string>this.auth.user.completed[c]
                };
            });

    }

    getMonth(k: number) {
        return MeditationTimelineComponent.months[k];
    }
}

