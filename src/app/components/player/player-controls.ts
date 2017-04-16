import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {FaqDialogComponent} from "../faq/faq";
import {AudioService} from "../../services/audio";


@Component({
    selector: 'bc-player-controls',
    templateUrl: './player-controls.html',
    styleUrls: ['./player-controls.scss']
})
export class PlayerControlsComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    fullscreen() {

    }

    rewind() {

    }

}




/*
if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
} else if(document.body.requestFullscreen) {
    document.body.requestFullscreen();
} else if(document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
} else if(document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
} else if(document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
}
    */


