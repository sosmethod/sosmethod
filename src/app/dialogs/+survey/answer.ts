import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
    selector: 'bc-answer',
    templateUrl: './answer.html',
    styleUrls: ['./answer.scss']
})
export class AnswerComponent {

    value = 0;

    constructor(public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<AnswerComponent>) {
    }

}


