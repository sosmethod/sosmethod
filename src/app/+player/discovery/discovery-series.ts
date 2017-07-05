import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {Subscription} from 'rxjs/Subscription';
import {Series} from '../../shared/series';


@Component({
    selector: 'bc-discovery-series',
    templateUrl: './discovery-series.html',
    styleUrls: ['./discovery-series.scss']
})
export class DiscoverySeriesComponent implements OnInit, AfterViewInit, OnDestroy {
    completed: number[];
    public series: string;
    public day: string;
    public audioFile: string;
    public routerSub: Subscription;
    public routeSub: Subscription;
    public loaded = false;
    public audios: string[];
    public seriesLength = '';


    constructor(public route: ActivatedRoute,
                public router: Router,
                public audio: AudioService,
                public auth: AuthGuard) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.series = typeof params.discovery !== 'undefined' ? params['discovery'] : '';
            this.audioFile = '';
            this.updateSeries();
            if (typeof params.audio === 'undefined' || !params['audio'] || params['audio'] === '') {
                // get first uncompleted or first
                let audioUrl = this.audios[0];
                for (let i = 0; i < this.audios.length; i++) {
                    if (this.completed.indexOf(i + 1) > -1) {
                        audioUrl = this.audios[i + 1];
                    }
                }
                if (typeof audioUrl === 'undefined') {
                    audioUrl = this.audios[0];
                }
                this.router.navigate([audioUrl], {replaceUrl: true});
                this.day = '';
            } else {
                const match = Series.seriesRegex(params['audio']);
                const day = parseInt(match[1] || match[2]);
                this.day = '_day_' + day;
                this.audioFile = params['audio'];
            }
        });
    }

    getCompletedKeys() {
        let keys = (this.auth.user ? Object.keys(this.auth.user.completed || {}) : [])
            .filter((k) => this.auth.user.completed[k].indexOf(this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') > -1);
        if (this.series !== '') {
            keys = keys.filter(k => this.auth.user.completed[k].indexOf(this.series) > -1);
        }
        keys.sort((a, b) => parseInt(a) - parseInt(b));
        return keys;
    }

    updateSeries() {
        let keys = this.getCompletedKeys();
        if (this.series === '' && typeof this.auth.user !== 'undefined'
            && this.auth.user !== null && typeof this.auth.user.completed !== 'undefined'
            && keys.length > 0) {
            const last = this.auth.user.completed[keys.pop()];
            const seriesKeys = Object.keys(Series.colorSeries);
            this.seriesLength = this.auth.user && last.indexOf('_11_day') > -1 ? '_11_day' : '_5_day';
            this.series = this.auth.user ? (new RegExp(seriesKeys.join('|'), 'ig')).exec(last)[0] : 'essentials';
        } else if (this.series === '') {
            this.seriesLength = '_5_day';
            this.series = 'essentials';
        } else {
            this.seriesLength = this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day';
        }
        // get the new completed keys based on the current series
        keys = this.getCompletedKeys();
        this.completed = keys
            .map(k => {
                const match = Series.seriesRegex(this.auth.user.completed[k]);
                return match && parseInt(match[1] || match[2]) || 0;
            });
        this.audios = Series.audios[this.seriesLength + '/' + this.series]
            .map(a => '/play/' + this.seriesLength + '/' + this.series + '/' + a);
    }

    ngOnDestroy() {
        if (typeof this.routerSub !== 'undefined') {
            this.routerSub.unsubscribe();
        }
        this.routeSub.unsubscribe();
    }

    checkCompleted(minus: number) {
        const day = parseInt(this.day.replace('_day_', '')) + minus;
        return this.completed.indexOf(day) > -1;
    }

    ngAfterViewInit() {
        if (this.day === '') {
            return;
        }
        // only autoplay if uncompleted
        if (this.day === '_day_1' || this.checkCompleted(-1)) {
            this.audio.Play(encodeURIComponent(this.audioFile));
        }
        // only do this if it is new
        // if (this.day === '_day_1' && !this.checkCompleted(0)) {
        //    this.router.navigate(['/survey/series/' + this.seriesLength + '_' + this.series]);
        // }
        // only do this if it is new
        if ((this.day === '_day_5' && this.seriesLength === '_5_day'
            || this.day === '_day_11' && this.seriesLength === '_11_day')
            && !this.checkCompleted(0) && this.checkCompleted(-1)) {
            this.router.navigate(['/survey/completed/' + this.seriesLength + '_' + this.series]);
        }
        // subscribe to router once
        if (!this.loaded) {
            this.loaded = true;
            this.routerSub = this.router.events.filter(e => e instanceof NavigationEnd
            && (this.seriesLength === '_5_day' || this.seriesLength === '_11_day'))
                .subscribe(() => this.ngAfterViewInit());
        }
    }

    goBackToCourse() {
        this.router.navigate(['/course/discovery/' + this.series]);
    }
}

