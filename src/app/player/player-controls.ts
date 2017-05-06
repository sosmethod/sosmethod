import {Component, OnInit, Optional} from '@angular/core';
import {AudioService} from '../services/audio.service';


@Component({
    selector: 'bc-player-controls',
    templateUrl: './player-controls.html',
    styleUrls: ['./player-controls.scss']
})
export class PlayerControlsComponent implements OnInit {

    constructor(public audio: AudioService) {

    }

    ngOnInit() {
    }

    fullscreen() {
        const document: any = window.document;
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }

    }

    rewind() {
        const progress = this.audio.currentTime / this.audio.duration * 100 - 15 / this.audio.duration * 100;
        this.audio.SetTimePercent(progress);
    }

}




/*
    */


