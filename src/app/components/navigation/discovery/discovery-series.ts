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
            return params['discovery'];
        });
        this.day$ = this.route.params.map(params => {
            if (!params['audio'] || params['audio'] === '') {
                // TODO: get first uncompleted or first
                setTimeout(() => {
                    let nextLink = $(that._el.nativeElement).find('ol [routerLink*="' + params['discovery'] + '"]:not(.completed)').first();
                    if (nextLink.length == 0) {
                        nextLink = $(that._el.nativeElement).find('ol [routerLink*="' + params['discovery'] + '"]').first();
                    }
                    return that.router.navigate([nextLink.attr('routerLink')], {replaceUrl:true});
                });
                return '';
            } else {
                this.audio.nextUp = this.audio.AWS + encodeURIComponent(params['audio']);
                const match = DiscoverySeriesComponent.seriesRegex(params['audio']);
                return '_day_' + parseInt(match[1] || match[2]);
            }
        });
        this.series$.subscribe(s => {
            setTimeout(() => {
                this.seriesCompleted.apply(that, [s]);
            });
        });
    }

    seriesCompleted(s: string) {
        this.auth.user.subscribe(u => {
            const completed = u ? Object.keys(u.completed)
                .filter(k => u.completed[k].indexOf(s) > -1 && u.completed[k].indexOf(this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') > -1)
                .map(k => {
                    const match = DiscoverySeriesComponent.seriesRegex(u.completed[k]);
                    return parseInt(match[1] || match[2]);
                }) : [];
            $(this.discoverySeries.nativeElement).find('a[href*=".mp3"]').each((i, elem) => {
                const match = DiscoverySeriesComponent.seriesRegex($(elem).attr('href'));
                const day = parseInt(match[1] || match[2]);
                if (completed.indexOf(day) > -1) {
                    $(elem).addClass('completed')
                } else {
                    $(elem).removeClass('completed')
                }
            });
        });
    }

    goBackToCourse() {
        this.series$.subscribe((series) => this.router.navigate(['/discovery/' + series]));
    }
}

