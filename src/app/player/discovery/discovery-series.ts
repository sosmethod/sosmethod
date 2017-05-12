import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {AuthGuard} from '../../dialogs/+auth/auth-guard';


@Component({
    selector: 'bc-discovery-series',
    templateUrl: './discovery-series.html',
    styleUrls: ['./discovery-series.scss']
})
export class DiscoverySeriesComponent implements OnInit, AfterViewInit {
    static colorSeries: any = {
        'essentials': 'sos-circle-purple',
        'soothing_relief': 'sos-circle-green',
        'improving_relationships': 'sos-circle-ruby',
        'focus_and_creativity': 'sos-circle-gold',
        'kids': 'sos-circle-blue',
        'pets': 'sos-circle-coral'
    };

    @ViewChild('discoverySeries') discoverySeries: any;
    public series: string;
    public day: string;
    public audioFile: string;

    static seriesRegex = (s: string) => (/Day_([0-9]+)|[0-9]+_([0-9]+)/ig).exec(s.replace(/ |%20/ig, '_'));

    constructor(public route: ActivatedRoute,
                public router: Router,
                private _el: ElementRef,
                public audio: AudioService,
                public auth: AuthGuard) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.series = typeof params.discovery !== 'undefined' ? params['discovery'] : '';
            if (typeof params.audio === 'undefined') {
                this.day = '';
            } else if (!params['audio'] || params['audio'] === '') {
                this.day = '';
            } else {
                const match = DiscoverySeriesComponent.seriesRegex(params['audio']);
                const day = parseInt(match[1] || match[2]);
                this.day = '_day_' + day;
                this.audioFile = params['audio'];
            }
        });
    }

    ngAfterViewInit() {
        this.seriesCompleted(this.series, this.day);
        if (this.day === '_day_1' ||
            $(this.discoverySeries.nativeElement).find('a[href*=".mp3"]')
                .eq(parseInt(this.day.replace('_day_', '')) - 1).is('.completed')) {
            this.audio.Play(encodeURIComponent(this.audioFile));
        }
    }

    seriesCompleted(series: string, day: string) {
        const that = this;

        const keys = (this.auth.user ? Object.keys(this.auth.user.completed) : [])
            .filter(k => this.auth.user.completed[k].indexOf(series) > -1
            && this.auth.user.completed[k].indexOf(this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') > -1);
        keys.sort((a, b) => parseInt(b) - parseInt(a));
        if (series === '') {
            const seriesUri = this.auth.user
                ? this.auth.user.completed[keys.pop()].split('/').slice(0, 3).join('/')
                : '/_5_day/essentials';
            this.router.navigate([seriesUri], {replaceUrl: true});
            return;
        }
        const completed = keys
            .map(k => {
                const match = DiscoverySeriesComponent.seriesRegex(this.auth.user.completed[k]);
                return parseInt(match[1] || match[2]);
            });
        $(this.discoverySeries.nativeElement).find('a[href*=".mp3"]').each((i, elem) => {
            const match = DiscoverySeriesComponent.seriesRegex($(elem).attr('href'));
            const day2 = parseInt(match[1] || match[2]);
            if (completed.indexOf(day2) > -1) {
                $(elem).addClass('completed');
            } else {
                $(elem).removeClass('completed');
            }
        });

        // get first uncompleted or first
        if (day === '') {
            let nextLink = $(that._el.nativeElement).find('ol [routerLink*="' + series + '"]:not(.completed)').first();
            if (nextLink.length === 0) {
                nextLink = $(that._el.nativeElement).find('ol [routerLink*="' + series + '"]').first();
            }
            that.router.navigate([nextLink.attr('routerLink')], {replaceUrl: true});
        }
    }

    goBackToCourse() {
        this.router.navigate(['/discovery/' + this.series]);
    }
}

