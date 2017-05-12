import {Component, ViewChild, NgZone} from '@angular/core';
import {LayoutService} from '../layout-service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';


@Component({
    selector: 'bc-video',
    templateUrl: './video.html',
    styleUrls: ['./video.scss']
})
export class VideoComponent {
    @ViewChild('videoPlayer') videoPlayer: any;
    private mousedown: Observable<any>;
    private playingEvent: Observable<any>;
    private pausedEvent: Observable<any>;
    private playing = false;

    constructor(private _zone: NgZone,
                public layout: LayoutService) {
        layout.video.subscribe(v => {
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
            $(this.videoPlayer.nativeElement).parent().css('background-image', 'url(' + b + ')');
        });
        if (window.document) {
            const self = this;
            this.mousedown = Observable.create((observer: Observer<any>) => {
                window.document.addEventListener('mousedown', (args: any) => {
                    self._zone.run(() => observer.next(args));
                });
            });
            this.mousedown.subscribe(e => {
                if (this.videoPlayer.nativeElement.paused) {
                    this.videoPlayer.nativeElement.play();
                }
            });
        }
    }

}
