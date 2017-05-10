import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../layout/audio.service';


@Component({
    selector: 'bc-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    public isDiscovery$: boolean;
    public value: number;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public audio: AudioService) {
    }

    ngOnInit() {
        this.audio.timeupdate.subscribe(() => {
            const newVal = Math.round(this.audio._audio.currentTime / (this.audio._audio.duration || 1) * 1000) / 10;
            if (newVal !== this.value) {
                this.value = newVal;
            }
        });
        this.isDiscovery$ = this.router.url.indexOf('begin') > -1 || this.router.url.indexOf('_5_day') > -1
            || this.router.url.indexOf('_11_day') > -1;
    }

}


