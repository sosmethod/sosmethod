import {Component, OnInit, Optional, ViewChild} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from '../faq/faq';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'bc-player',
    templateUrl: './player.html',
    styleUrls: ['./player.scss']
})
export class PlayerComponent implements OnInit {
    public isDiscovery$: Observable<boolean>;

    constructor(public route: ActivatedRoute, public router: Router) {

    }

    ngOnInit() {
        this.isDiscovery$ = Observable.of(this.router.url.indexOf('_5_day') > -1 || this.router.url.indexOf('_11_day') > -1);
    }

    play() {

    }

    pause () {

    }
}


