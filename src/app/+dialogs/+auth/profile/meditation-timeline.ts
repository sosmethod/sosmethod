import {Component, OnInit, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AuthGuard} from '../auth-guard';
import {Meditations} from '../../../shared/meditations';

@Component({
    selector: 'bc-meditation-timeline',
    templateUrl: './meditation-timeline.html',
    styleUrls: ['./timeline.scss']
})
export class MeditationTimelineComponent implements OnInit {

    email: string;
    public completed: { meditation: string, color: string, series: string, time: Date, url: string }[];

    constructor(public router: Router,
                public dialog: MdDialog,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<MeditationTimelineComponent>) {
    }

    ngOnInit() {
        this.completed = Object.keys(this.auth.user.completed)
            .filter(c => this.auth.user.completed[c].indexOf('meditations') > -1)
            .map(c => {
                return Meditations.getLinkProps(this.auth.user.completed[c], new Date(parseInt(c)));
            });
    }

    getMonth(k: number) {
        return Meditations.months[k];
    }
}

