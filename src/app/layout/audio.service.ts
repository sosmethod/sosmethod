/**
 * @class
 * @description
 * Wrapper for HTML5 audio.
 */

import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class AudioService {
    public playerPositions: ReplaySubject<number> = new ReplaySubject();
    public position: ReplaySubject<number> = new ReplaySubject();
    public AWS = 'https://s3-us-west-2.amazonaws.com/sosmethod/';

    public timeupdate: Observable<number>;
    public metadata: Observable<any>;
    public ended: Observable<string>;
    public progress: Observable<string>;
    public abort: Observable<string>;
    public play: Observable<string>;
    public pause: Observable<string>;
    public stalled: Observable<string>;
    public waiting: Observable<string>;
    public playing: Observable<string>;
    public seeking: Observable<string>;
    public seeked: Observable<string>;
    public emptied: Observable<string>;

    public state: Subject<string> = new Subject();

    _src: string;
    _audio: any;
    _audioSrc: any;
    _analyser: any;
    _audioCtx = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
    _svg: any;
    public duration: number;
    public currentTime: number;

    constructor(private _zone: NgZone) {
        this._createAudio();
    }

    Play(nextUp: string = null) {
        if (nextUp) {
            this.Load(this.AWS + nextUp);
        }
        this._audio.play();
        // Comment visuliziation out for now.
        // this.Visualize();
    }

    Pause() {
        this._audio.pause();
    }

    Stop() {
        this._audio.pause();
    }

    Load(url: string) {
        try {
            if (!this._audio || url !== this._src) {
                this._createAudio();
                this._audio.src = this._src = url;
                this._audio.load();
            }
        } catch (e) {
        }
    }

    SetTimePercent(percent: number) {
        if (typeof this._audio.seekable === 'object' && this._audio.seekable.length > 0) {
            this._audio.currentTime = percent * this._audio.seekable.end(this._audio.seekable.length - 1) / 100;
        } else if (this._audio.duration > 0 && !isNaN(this._audio.duration)) {
            this._audio.currentTime = percent * this._audio.duration / 100;
        }
    }

    BindEvents() {

        this.timeupdate = this.BindAudioEvent('timeupdate');
        this.metadata = this.BindAudioEvent('loadedmetadata');
        this.ended = this.BindAudioEvent('ended');
        this.progress = this.BindAudioEvent('progress');
        this.abort = this.BindAudioEvent('abort');
        this.play = this.BindAudioEvent('play');
        this.pause = this.BindAudioEvent('pause');
        this.stalled = this.BindAudioEvent('stalled');
        this.waiting = this.BindAudioEvent('waiting');
        this.playing = this.BindAudioEvent('playing');
        this.seeking = this.BindAudioEvent('seeking');
        this.seeked = this.BindAudioEvent('seeked');
        this.emptied = this.BindAudioEvent('emptied');

    }

    AttachEvents() {
        this.BindEvents();
        this.ended.subscribe(() => this.state.next('ended'));
        this.abort.subscribe(() => this.state.next('abort'));
        this.play.subscribe(() => this.state.next('play'));
        this.pause.subscribe(() => this.state.next('pause'));
        this.stalled.subscribe(() => this.state.next('stalled'));
        this.waiting.subscribe(() => this.state.next('waiting'));
        this.playing.subscribe(() => this.state.next('playing'));
        this.seeking.subscribe(() => this.state.next('seeking'));
        this.seeked.subscribe(() => this.state.next('seeked'));
        this.emptied.subscribe(() => this.state.next('emptied'));
        this.state.subscribe(() => {
            this.duration = this._audio.duration;
        });
        this.timeupdate.subscribe(() => {
            this.currentTime = this._audio.currentTime;
        });
    }

    BindAudioEvent<E>(eventName: string): Observable<E> {
        const self = this;
        return Observable.create((observer: Observer<E>) => {
            self._audio.addEventListener(eventName, (args: E) => {
                self._zone.run(() => observer.next(args));
            });
        });
    }

    _createAudio(): void {

        if (!this._audio) {
            this._audio = new Audio();
        }

        if (!this._audioSrc) {
            this._audio.autoplay = false;
            this._audio.preload = 'auto';
            this._audio.autobuffer = true;
            this._audioSrc = this._audioCtx.createMediaElementSource(this._audio);
        }

        if (!this._analyser && this._audioSrc.connect) {
        }
    }

    _destroyAudio(): void {
        if (this._audio) {
            this._audio.pause();
            this._audio.unbindEvents();
            try {
                this._audio.src = '';
            } finally {
                delete this._audio;
            }
        }
    }

}

