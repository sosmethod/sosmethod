import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";


@Component({
    selector: 'bc-tool-dialog',
    templateUrl: './tool.html',
    styleUrls: ['./tool.scss']
})
export class ToolDialogComponent {

    constructor(public dialogRef: MdDialogRef<ToolDialogComponent>, public dialog: MdDialog) {
    }

    showFaqDialog() {
        this.dialog.open(FaqDialogComponent);
    }
}