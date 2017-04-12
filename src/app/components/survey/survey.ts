import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";


@Component({
    selector: 'bc-survey-dialog',
    templateUrl: './survey.html',
    styleUrls: ['./survey.scss']
})
export class SurveyDialogComponent {

    constructor(public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<SurveyDialogComponent>) {}

}


