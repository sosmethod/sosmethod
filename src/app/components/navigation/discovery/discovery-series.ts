import {
    Component, OnInit, ViewChild,
    ElementRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../../services/audio';
import {AuthGuard} from "../../../guards/auth";


@Component({
    selector: 'bc-discovery-series',
    templateUrl: './discovery-series.html',
    styleUrls: ['./discovery-series.scss']
})
export class DiscoverySeriesComponent implements OnInit {
    @ViewChild('discoverySeries') discoverySeries: any;
    public series$: Observable<string>;
    public day$: Observable<string>;

    static seriesRegex = (s: string) => (/Day_([0-9]+)|[0-9]+_([0-9]+)/ig).exec(s.replace(/ |%20/ig, '_'));
    static colorSeries: any = {
        "essentials": "sos-circle-purple",
        "soothing_relief": "sos-circle-green",
        "improving_relationships": "sos-circle-ruby",
        "focus_and_creativity": "sos-circle-gold",
        "kids": "sos-circle-blue",
        "pets": "sos-circle-coral"
    };

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private _el: ElementRef,
        public audio: AudioService,
        public auth: AuthGuard) {

    }

    ngOnInit() {
        const that = this;
        this.series$ = this.route.params.map(params => {
            return typeof params.discovery != 'undefined' ? params['discovery'] : '';
        });
        this.day$ = this.route.params.map(params => {
            if(typeof params.audio == 'undefined') {
                return '';
            } else if (!params['audio'] || params['audio'] === '') {
                return '';
            } else {
                this.audio.nextUp = this.audio.AWS + encodeURIComponent(params['audio']);
                const match = DiscoverySeriesComponent.seriesRegex(params['audio']);
                return '_day_' + parseInt(match[1] || match[2]);
            }
        });
        this.series$.subscribe(series => {
            setTimeout(() => {
                this.seriesCompleted.apply(that, [series]);
            });
        });
    }

    seriesCompleted(series: string) {
        const that = this;

        const keys = (this.auth.user ? Object.keys(this.auth.user.completed) : [])
            .filter(k => this.auth.user.completed[k].indexOf(series) > -1
            && this.auth.user.completed[k].indexOf(this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') > -1);
        keys.sort();
        if (series == '') {
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
            const day = parseInt(match[1] || match[2]);
            if (completed.indexOf(day) > -1) {
                $(elem).addClass('completed');
            } else {
                $(elem).removeClass('completed');
            }
        });

        // get first uncompleted or first
        setTimeout(() => {
            let nextLink = $(that._el.nativeElement).find('ol [routerLink*="' + series + '"]:not(.completed)').first();
            if (nextLink.length == 0) {
                nextLink = $(that._el.nativeElement).find('ol [routerLink*="' + series + '"]').first();
            }
            return that.router.navigate([nextLink.attr('routerLink')], {replaceUrl:true});
        });

    }

    goBackToCourse() {
        this.series$.subscribe((series) => this.router.navigate(['/discovery/' + series]));
    }
}

