import {Component, ViewChild, NgZone, Inject, AfterViewInit} from '@angular/core';
import {LayoutService} from '../layout-service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {DOCUMENT} from '@angular/platform-browser';


@Component({
    selector: 'bc-video',
    templateUrl: './video.html',
    styleUrls: ['./video.scss']
})
export class VideoComponent implements AfterViewInit {
    @ViewChild('videoPlayer') videoPlayer: any;
    private mousedown: Observable<any>;
    private playingEvent: Observable<any>;
    private pausedEvent: Observable<any>;
    private playing = false;

    constructor(private _zone: NgZone,
                public layout: LayoutService,
                @Inject(DOCUMENT) private document: any) {
    }

    ngAfterViewInit() {
        const player = this.videoPlayer.nativeElement;
        this.layout.video.subscribe(v => {
            $().find('source').remove();

            const source = this.document.createElement('source');
            source.src = v + '.webm';
            source.type = 'video/webm';
            player.appendChild(source);

            const source2 = this.document.createElement('source');
            source2.src = v + '.mp4';
            source2.type = 'video/mp4';
            player.appendChild(source2);

            player.load();
            player.play();
            if (v.indexOf('1927594') > -1) {
                player.playbackRate = .5;
            } else {
                player.playbackRate = 1;
            }
        });
        this.layout.background.subscribe(b => {
            $(player).parent().css('background-image', 'url(' + b + ')');
        });
        if (this.document) {
            const self = this;
            this.mousedown = Observable.create((observer: Observer<any>) => {
                this.document.addEventListener('mousedown', (args: any) => {
                    self._zone.run(() => observer.next(args));
                });
            });
            this.mousedown.subscribe(e => {
                if (player.paused) {
                    player.play();
                }
            });
        }
    }

}
