import {Component, OnInit, Optional, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from "../../services/audio";


@Component({
    selector: 'bc-player',
    templateUrl: './player.html',
    styleUrls: ['./player.scss']
})
export class PlayerComponent implements OnInit {
    public isDiscovery$: Observable<boolean>;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public audio: AudioService) {

    }

    ngOnInit() {
        this.isDiscovery$ = Observable.of(this.router.url.indexOf('_5_day') > -1 || this.router.url.indexOf('_11_day') > -1);
    }

}


