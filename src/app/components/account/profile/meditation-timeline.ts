import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {AuthGuard} from '../../../guards/auth';
import {DiscoverySeriesComponent} from '../../navigation/discovery/discovery-series';

@Component({
    selector: 'bc-meditation-timeline',
    templateUrl: './meditation-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class MeditationTimelineComponent {
    email: string;
    private firebase: firebase.app.App;
    public completed: {meditation: string, color: string, series: string, time: Date, url: string}[];
    static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    static colorSeries: any = {
        'classic_calm': 'sos-circle-purple',
        'relax': 'sos-circle-green',
        'affirming_word': 'sos-circle-ruby',
        'elevate': 'sos-circle-gold',
        'love_forgiveness': 'sos-circle-blue',
        'emergency': 'sos-circle-coral'
    };
    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<MeditationTimelineComponent>) {
        this.firebase = firebase.app();
        this.completed = Object.keys(this.auth.user.completed)
            .filter(c => this.auth.user.completed[c].indexOf('meditations') > -1)
            .map(c => {
                const series = 'MEDITATIONS.TITLE.'
                    + this.auth.user.completed[c].split('/')[2];
                const meditation = 'MEDITATIONS.MEDITATE.'
                    + this.auth.user.completed[c].split('/')[3];
                return {
                    meditation: meditation,
                    color: 'sos-circle ' + MeditationTimelineComponent.colorSeries[this.auth.user.completed[c].split('/')[2]],
                    series: series,
                    time: new Date(parseInt(c)),
                    url: <string>this.auth.user.completed[c]
                };
            });
    }

    getMonth(k: number) {
        return MeditationTimelineComponent.months[k];
    }
}

