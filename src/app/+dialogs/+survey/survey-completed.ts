import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthGuard} from '../+auth/auth-guard';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
    selector: 'bc-survey-completed',
    templateUrl: './survey-completed.html',
    styleUrls: ['./survey-completed.scss']
})
export class SurveyCompletedComponent {
    public tool: Observable<string>;
    public error = false;
    form: FormGroup;
    survey: SurveyCompleted;

    constructor(public builder: FormBuilder,
                public dialog: MdDialog,
                public route: ActivatedRoute,
                public database: AngularFireDatabase,
                public auth: AuthGuard,
                @Optional() public dialogRef?: MdDialogRef<SurveyCompletedComponent>) {
        if (this.dialogRef) {
            this.tool = Observable
                .of((<ActivatedRouteSnapshot>this.dialogRef._containerInstance.dialogConfig.data).params.series);
        } else {
            this.tool = this.route.params.map(params => {
                return params['series'];
            });
        }
        this.survey = new SurveyCompleted();
        this.form = this.builder.group(this.survey);
    }

    onSend() {
        const dateKey = (new Date).getTime();
        this.dialog.closeAll();
        this.database.object('/surveys/' + dateKey + '_'
            + AuthGuard.escapeEmail(this.auth.user ? this.auth.user.username : 'anonymous')).set(this.survey);
    }
}

export class SurveyCompleted {
    feltStressed = 0;
    feltCalm = 0;
    manageChallenges = 0;
    howHelp = '';
    describe = '';
}
