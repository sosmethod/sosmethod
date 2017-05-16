import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
    selector: 'bc-survey-profile',
    templateUrl: './survey-profile.html',
    styleUrls: ['./survey-profile.scss']
})
export class SurveyProfileComponent {
    constructor(public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<SurveyProfileComponent>) {
    }

}


