import {Component, HostBinding, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
    selector: 'bc-faq',
    templateUrl: './faq.html',
    styleUrls: ['./faq.scss']
})
export class FaqDialogComponent {

    public highlightedDiv: number;
    @HostBinding('class.faq') isFAQ = true;

    constructor(
        public dialog: MdDialog,
        @Optional() public dialogRef?: MdDialogRef<FaqDialogComponent>) {}

    toggleHighlight(newValue: number) {
        if (this.highlightedDiv === newValue) {
            this.highlightedDiv = 0;
        }
        else {
            this.highlightedDiv = newValue;
        }
    }
}