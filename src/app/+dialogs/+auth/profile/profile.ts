import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AuthGuard} from '../auth-guard';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Profile} from './profile-model';
import {SurveyProfile} from '../../+survey/survey-profile';

@Component({
    selector: 'bc-profile',
    templateUrl: './profile.html',
    styleUrls: ['./profile.scss']
})


export class AccountProfileComponent implements AfterViewInit {
    email: string;
    public user: firebase.User;
    public form: FormGroup;
    public survey: FormGroup;
    public data = new Profile();
    public surveyProfile = new SurveyProfile();
    @ViewChild('tabContent') public tabContent: any;
    public saveTab = false;

    constructor(public router: Router,
                public fireAuth: AngularFireAuth,
                public builder: FormBuilder,
                public database: AngularFireDatabase,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<AccountProfileComponent>) {
        this.form = builder.group(this.data);
        this.survey = builder.group(this.surveyProfile);
    }

    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.saveTab = this.tabContent.selectedIndex === 0 || this.tabContent.selectedIndex === 3;
        });
    }

    save() {
        if (this.user == null) {
            return;
        }
        const updates: any = {};
        updates['name/first'] = this.data.first;
        updates['name/last'] = this.data.last;
        this.database.object('/users/' + AuthGuard.escapeEmail(this.user.email)).set(updates);
    }
}

