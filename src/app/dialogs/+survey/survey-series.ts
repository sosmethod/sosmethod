import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
    selector: 'bc-survey-series',
    templateUrl: './survey-series.html',
    styleUrls: ['./survey-series.scss']
})
export class SurveySeriesComponent {
    constructor(public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<SurveySeriesComponent>) {}

}


