import {Component, OnInit, Optional, Inject} from '@angular/core';
import {AudioService} from '../layout/audio.service';
import {DOCUMENT} from "@angular/platform-browser";


@Component({
    selector: 'bc-player-controls',
    templateUrl: './player-controls.html',
    styleUrls: ['./player-controls.scss']
})
export class PlayerControlsComponent implements OnInit {

    constructor(public audio: AudioService,
                @Inject(DOCUMENT) private document: any) {

    }

    ngOnInit() {
    }

    fullscreen() {
        if (this.document.fullscreenElement || this.document.mozFullScreenElement || this.document.webkitFullscreenElement) {
            if (this.document.exitFullscreen) {
                this.document.exitFullscreen();
            } else if (this.document.mozCancelFullScreen) {
                this.document.mozCancelFullScreen();
            } else if (this.document.webkitExitFullscreen) {
                this.document.webkitExitFullscreen();
            }
        } else if (this.document.body.requestFullscreen) {
            this.document.body.requestFullscreen();
        } else if (this.document.documentElement.mozRequestFullScreen) {
            this.document.documentElement.mozRequestFullScreen();
        } else if (this.document.documentElement.webkitRequestFullscreen) {
            this.document.documentElement.webkitRequestFullscreen();
        } else if (this.document.documentElement.msRequestFullscreen) {
            this.document.documentElement.msRequestFullscreen();
        }

    }

    rewind() {
        const progress = this.audio.currentTime / this.audio.duration * 100 - 15 / this.audio.duration * 100;
        this.audio.SetTimePercent(progress);
    }

}


/*
 */


