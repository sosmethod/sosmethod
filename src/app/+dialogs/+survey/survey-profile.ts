import {Component, Input, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'bc-survey-profile',
    templateUrl: './survey-profile.html',
    styleUrls: ['./survey-profile.scss']
})
export class SurveyProfileComponent {
    @Input() public form: FormGroup;
    @Input() public profile: SurveyProfile;
    @Input() public error = false;

    constructor(public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<SurveyProfileComponent>) {
    }
}

export class SurveyProfile {
    continent = '';
    other = '';
    advertiser = '';
    priorities = '';
    challenge = '';
    ageGroup = '';
}

