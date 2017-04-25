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
    public value: Observable<number>;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public audio: AudioService) {
        this.value = this.audio.timeupdate.map(() => {
            return Math.round(this.audio._audio.currentTime / (this.audio._audio.duration || 1) * 1000) / 10
        });
    }

    ngOnInit() {
        this.isDiscovery$ = Observable.of(this.router.url.indexOf('begin') || this.router.url.indexOf('_5_day') > -1 || this.router.url.indexOf('_11_day') > -1);
    }

}


