import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';


@Component({
    selector: 'bc-bonus-dialog',
    templateUrl: './bonus.html',
    styleUrls: ['./bonus.scss']
})
export class BonusDialogComponent implements OnInit {
    public tool: Observable<string>;

    constructor(public route: ActivatedRoute,
                public dialog: MdDialog,
                @Optional() public dialogRef?: MdDialogRef<BonusDialogComponent>) {
    }

    ngOnInit() {
        if (this.dialogRef) {
            this.tool = Observable.of((<ActivatedRouteSnapshot>this.dialogRef._containerInstance.dialogConfig.data).params.bonus);
        } else {
            this.tool = this.route.params.map(params => {
                return params['bonus'];
            });
        }
    }

}

