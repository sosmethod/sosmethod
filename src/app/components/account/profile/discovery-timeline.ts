import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {MeditationTimelineComponent} from "./meditation-timeline";
import {Observable} from "rxjs/Observable";
import {AuthGuard} from "../../../guards/auth";
import {DiscoverySeriesComponent} from "../../navigation/discovery/discovery-series";

@Component({
    selector: 'bc-discovery-timeline',
    templateUrl: './discovery-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class DiscoveryTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: Observable<{color: string, series: string, day: string, time: Date, url: string}[]>;

    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<DiscoveryTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = this.auth.user.map(u => Object.keys(u.completed)
            .filter(c => u.completed[c].indexOf('_5_day') > -1 || u.completed[c].indexOf('_11_day') > -1)
            .map(c => {
                const match = DiscoverySeriesComponent.seriesRegex(u.completed[c].split('/').pop());
                const day = 'DISCOVERY.SUBTEXT.'
                    + (u.completed[c].indexOf('_11_day') > -1 ? '_11_day' : '_5_day')
                    + '_' + u.completed[c].split('/')[2]
                    + '._day_' + parseInt(match[1] || match[2]);
                const series = 'DISCOVERY.TITLE.'
                    + (u.completed[c].indexOf('_11_day') > -1 ? '_11_day' : '_5_day')
                    + '_' + u.completed[c].split('/')[2];
                return {
                    color: 'sos-circle ' + DiscoverySeriesComponent.colorSeries[u.completed[c].split('/')[2]],
                    series: series,
                    day: day,
                    time: new Date(parseInt(c)),
                    url: <string>u.completed[c]
                };
            }));

    }

    getMonth(k: number) {
        return MeditationTimelineComponent.months[k];
    }
}

