import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';


@Component({
    selector: 'bc-faq',
    templateUrl: './faq.html',
    styleUrls: ['./faq.scss']
})
export class FaqDialogComponent {

    constructor(public dialogRef: MdDialogRef<FaqDialogComponent>) {}
}