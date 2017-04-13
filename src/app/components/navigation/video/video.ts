import {Component, Output, EventEmitter, Input, ChangeDetectorRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../../services/layout";


@Component({
    selector: 'bc-video',
    templateUrl: './video.html',
    styleUrls: ['./video.scss']
})
export class VideoComponent {
    @ViewChild('videoPlayer') videoPlayer: any;

    constructor(public layout: LayoutService) {
        layout.video$.subscribe(v => {
            this.videoPlayer.nativeElement.src = [v + '.webm', v + '.mp4'];
            this.videoPlayer.nativeElement.load();
            this.videoPlayer.nativeElement.play();
            if (v.indexOf('1927594') > -1) {
                this.videoPlayer.nativeElement.playbackRate = .5;
            } else {
                this.videoPlayer.nativeElement.playbackRate = 1;
            }
        });
    }

}
