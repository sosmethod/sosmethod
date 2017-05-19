import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {AuthGuard} from '../../dialogs/+auth/auth-guard';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'bc-discovery-series',
    templateUrl: './discovery-series.html',
    styleUrls: ['./discovery-series.scss']
})
export class DiscoverySeriesComponent implements OnInit, AfterViewInit, OnDestroy {
    completed: number[];
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
    public routerSub: Subscription;
    public routeSub: Subscription;
    public loaded = false;
    public seriesLength = '';

    static seriesRegex = (s: string) => (/Day_([0-9]+)|[0-9]+_([0-9]+)/ig).exec(s.replace(/ |%20/ig, '_'));

    constructor(public route: ActivatedRoute,
                public router: Router,
                private _el: ElementRef,
                public audio: AudioService,
                public auth: AuthGuard) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.series = typeof params.discovery !== 'undefined' ? params['discovery'] : '';
            this.audioFile = '';
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
        const keys = (this.auth.user ? Object.keys(this.auth.user.completed) : [])
            .filter(k => this.auth.user.completed[k].indexOf(this.series) > -1
            && this.auth.user.completed[k].indexOf(this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') > -1);
        keys.sort((a, b) => parseInt(a) - parseInt(b));
        if (this.series === '') {
            this.seriesLength = this.auth.user ? this.auth.user.completed[keys.pop()].split('/')[1] : '_5_day';
            this.series = this.auth.user ? this.auth.user.completed[keys.pop()].split('/')[2] : 'essentials';
        } else {
            this.seriesLength = this.router.url.split('/')[1];
        }
        this.completed = keys
            .map(k => {
                const match = DiscoverySeriesComponent.seriesRegex(this.auth.user.completed[k]);
                return parseInt(match[1] || match[2]);
            });
    }

    ngOnDestroy() {
        if (typeof this.routerSub !== 'undefined') {
            this.routerSub.unsubscribe();
        }
        this.routeSub.unsubscribe();
    }

    ngAfterViewInit() {
        this.seriesCompleted();
        // get first uncompleted or first
        if (this.audioFile === '') {
            let nextLink = $(this._el.nativeElement).find('ol a:visible:not(.completed)').first();
            if (nextLink.length === 0) {
                nextLink = $(this._el.nativeElement).find('ol a:visible').first();
            }
            const uncompleted = nextLink.attr('routerLink');
            this.router.navigate([uncompleted], {replaceUrl: true});
            return;
        }
        // only autoplay if uncompleted
        if (this.day === '_day_1' ||
            $(this.discoverySeries.nativeElement).find('a[href*=".mp3"]')
                .eq(parseInt(this.day.replace('_day_', '')) - 2).is('.completed')) {
            this.audio.Play(encodeURIComponent(this.audioFile));
        }
        if (this.day === '_day_1' &&
            // only do this if it is new
            !$(this.discoverySeries.nativeElement).find('a[href*=".mp3"]')
                .eq(parseInt(this.day.replace('_day_', '')) - 1).is('.completed')) {
            this.router.navigate(['/survey/series/' + this.seriesLength + '_' + this.series]);
            return;
        }
        if ((this.day === '_day_5' && this.seriesLength === '_5_day'
            || this.day === '_day_11' && this.seriesLength === '_11_day') &&
            // only do this if it is new
            !$(this.discoverySeries.nativeElement).find('a[href*=".mp3"]')
                .eq(parseInt(this.day.replace('_day_', '')) - 1).is('.completed') &&
            $(this.discoverySeries.nativeElement).find('a[href*=".mp3"]')
                .eq(parseInt(this.day.replace('_day_', '')) - 2).is('.completed')) {
            this.router.navigate(['/survey/completed/' + this.seriesLength + '_' + this.series]);
            return;
        }
        // subscribe to router once
        if (!this.loaded) {
            this.loaded = true;
            this.routerSub = this.router.events.filter(e => e instanceof NavigationEnd
            && (this.seriesLength === '_5_day' || this.seriesLength === '_11_day'))
                .subscribe(() => this.ngAfterViewInit());
        }
    }

    seriesCompleted() {
        $(this.discoverySeries.nativeElement).find('a[href*=".mp3"]').each((i, elem) => {
            const match = DiscoverySeriesComponent.seriesRegex($(elem).attr('href'));
            const day2 = parseInt(match[1] || match[2]);
            if (this.completed.indexOf(day2) > -1) {
                $(elem).addClass('completed');
            } else {
                $(elem).removeClass('completed');
            }
        });

    }

    goBackToCourse() {
        this.router.navigate(['/discovery/' + this.series]);
    }
}

