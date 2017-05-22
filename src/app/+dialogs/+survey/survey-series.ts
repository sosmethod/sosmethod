import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthGuard} from '../+auth/auth-guard';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
    selector: 'bc-survey-series',
    templateUrl: './survey-series.html',
    styleUrls: ['./survey-series.scss']
})
export class SurveySeriesComponent {
    public tool: Observable<string>;
    public error = false;
    form: FormGroup;
    survey: SurveySeries;

    constructor(public builder: FormBuilder,
                public dialog: MdDialog,
                public database: AngularFireDatabase,
                public auth: AuthGuard,
                public route: ActivatedRoute,
                @Optional() public dialogRef?: MdDialogRef<SurveySeriesComponent>) {
        if (this.dialogRef) {
            this.tool = Observable
                .of((<ActivatedRouteSnapshot>this.dialogRef._containerInstance.dialogConfig.data).params.series);
        } else {
            this.tool = this.route.params.map(params => {
                return params['series'];
            });
        }
        this.survey = new SurveySeries();
        this.form = this.builder.group(this.survey);
    }

    onSend() {
        const dateKey = (new Date).getTime();
        this.dialog.closeAll();
        this.database.object('/surveys/' + dateKey + '_'
            + AuthGuard.escapeEmail(this.auth.user ? this.auth.user.username : 'anonymous')).set(this.survey);
    }
}


export class SurveySeries {
    feltStressed = 0;
    feltCalm = 0;
    manageChallenges = 0;
}

