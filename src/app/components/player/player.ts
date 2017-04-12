import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'bc-player',
    templateUrl: './player.html',
    styleUrls: ['./player.scss']
})
export class PlayerComponent implements OnInit {

    constructor(public route: ActivatedRoute) {

    }

    ngOnInit() {

    }

}


