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
            $(this.videoPlayer.nativeElement).find('source').remove();

            const source = document.createElement('source');
            source.src = v + '.webm';
            source.type = 'video/webm';
            this.videoPlayer.nativeElement.appendChild(source);

            const source2 = document.createElement('source');
            source2.src = v + '.mp4';
            source2.type = 'video/mp4';
            this.videoPlayer.nativeElement.appendChild(source2);

            this.videoPlayer.nativeElement.load();
            this.videoPlayer.nativeElement.play();
            if (v.indexOf('1927594') > -1) {
                this.videoPlayer.nativeElement.playbackRate = .5;
            } else {
                this.videoPlayer.nativeElement.playbackRate = 1;
            }
        });
        layout.background.subscribe(b => {
            $(this.videoPlayer.nativeElement).css('background-image', b);
        });
    }

}
