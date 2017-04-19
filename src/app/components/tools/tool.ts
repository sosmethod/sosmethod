import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";
import {Observable, Subject} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";


@Component({
    selector: 'bc-tool-dialog',
    templateUrl: './tool.html',
    styleUrls: ['./tool.scss']
})
export class ToolDialogComponent implements OnInit {
    public tool$: Observable<string> = new Subject;

    constructor(public route: ActivatedRoute, public dialog: MdDialog, @Optional() public dialogRef?: MdDialogRef<ToolDialogComponent>) {
    }

    ngOnInit() {
        if(this.dialogRef) {
            this.tool$ = Observable.of((<ActivatedRouteSnapshot>this.dialogRef._containerInstance.dialogConfig.data).params.tool);
        }
        else {
            this.tool$ = this.route.params.map(params => {
                return params['tool'];
            });
        }
    }

    showFaqDialog() {
        this.dialog.open(FaqDialogComponent);
    }
}