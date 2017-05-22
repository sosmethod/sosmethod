import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
    selector: 'bc-survey-dialog',
    templateUrl: './survey.html',
    styleUrls: ['./survey.scss']
})
export class SurveyDialogComponent {

    public score: number;

    constructor(public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<SurveyDialogComponent>) {}

}


