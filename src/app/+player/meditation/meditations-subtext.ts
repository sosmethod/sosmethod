import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {Subscription} from 'rxjs/Subscription';
import {Meditations} from '../../shared/meditations';


@Component({
    selector: 'bc-meditations-subtext',
    templateUrl: './meditations-subtext.html',
    styleUrls: ['./meditations-subtext.scss']
})
export class MeditationsSubtextComponent implements OnInit, AfterViewInit, OnDestroy {
    series: string;
    discovery: string;
    audios: any;
    public day: string;
    public audioUrl: string;
    public routerSub: Subscription;
    public routeSub: Subscription;
    public loaded = false;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public audio: AudioService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.series = params['meditation'];
            this.discovery = params['discovery'];
            if (!params['audio'] || params['audio'] === '') {
                this.audioUrl = '';
            } else {
                this.audioUrl = params['audio'];
            }
            const audio = Meditations.audios[this.discovery + '/' + this.series];
            if (this.audioUrl === '') {
                // TODO: get first uncompleted or first
                const keys = Object.keys(audio);
                const audioUrl = '/play/meditations/' + this.discovery + '/' + this.series + '/' + audio[keys[0]];
                this.router.navigate([audioUrl], {replaceUrl: true});
                return;
            }
        });
    }

    ngOnDestroy() {
        if (typeof this.routerSub !== 'undefined') {
            this.routerSub.unsubscribe();
        }
        this.routeSub.unsubscribe();
    }

    ngAfterViewInit() {
        if (this.audioUrl === '') {
            return;
        }
        const audio = Meditations.audios[this.discovery + '/' + this.series];
        this.audio.Play(encodeURIComponent(this.audioUrl));
        const audios = Object.keys(audio).map(k => audio[k]).filter(k => k.substr(0, 1) !== '/');
        const day = audios.indexOf(this.audioUrl);
        this.audio.playerPositions.next(audios.length);
        this.audio.position.next(day);
        this.day = '_day_' + day;
        this.audios = Object.keys(audio).map(k => ({
            series: k,
            url: '/play/meditations/' + this.discovery + '/' + this.series + '/' + audio[k],
            color: 'sos-circle ' + Meditations.colorSeries[this.discovery],
        }));
        if (!this.loaded) {
            this.loaded = true;
            this.routerSub = this.router.events.filter(e => e instanceof NavigationEnd
            && this.router.url.indexOf('meditations') > -1)
                .subscribe(() => this.ngAfterViewInit());
        }
    }
}

