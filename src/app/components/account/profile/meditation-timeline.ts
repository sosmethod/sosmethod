import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {Observable} from "rxjs/Observable";
import {AuthGuard} from "../../../guards/auth";
import {DiscoverySeriesComponent} from "../../navigation/discovery/discovery-series";

@Component({
    selector: 'bc-meditation-timeline',
    templateUrl: './meditation-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class MeditationTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: Observable<{meditation: string, color: string, series: string, day: string, time: Date, url: string}[]>;
    static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    static colorSeries: any = {
        "classic_calm": "sos-circle-purple",
        "relax": "sos-circle-green",
        "affirming_word": "sos-circle-ruby",
        "elevate": "sos-circle-gold",
        "love_forgiveness": "sos-circle-blue",
        "emergency": "sos-circle-coral"
    };
    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<MeditationTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = this.auth.user.map(u => Object.keys(u.completed)
            .filter(c => u.completed[c].indexOf('meditations') > -1)
            .map(c => {
                const series = 'MEDITATIONS.TITLE.'
                    + u.completed[c].split('/')[2];
                const meditation = 'MEDITATIONS.MEDITATE.'
                    + u.completed[c].split('/')[3];
                return {
                    meditation: meditation,
                    color: 'sos-circle ' + MeditationTimelineComponent.colorSeries[u.completed[c].split('/')[2]],
                    series: series,
                    time: new Date(parseInt(c)),
                    url: <string>u.completed[c]
                };
            }));
    }

    getMonth(k: number) {
        return MeditationTimelineComponent.months[k];
    }
}

