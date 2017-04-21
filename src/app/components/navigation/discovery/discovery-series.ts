import {
    Component, OnInit, ViewChild,
    ElementRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../../services/audio';


@Component({
    selector: 'bc-discovery-series',
    templateUrl: './discovery-series.html',
    styleUrls: ['./discovery-series.scss']
})
export class DiscoverySeriesComponent implements OnInit {
    @ViewChild('discovery') discovery: any;
    public series$: Observable<string>;
    public day$: Observable<string>;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private _el: ElementRef,
        public audio: AudioService) {

    }

    ngOnInit() {
        const that = this;
        this.series$ = this.route.params.map(params => {
            return params['discovery'];
        });
        this.day$ = this.route.params.withLatestFrom(this.series$, (params, series) => ({params, series}))
            .map(({params, series}) => {
            if (!params['audio'] || params['audio'] === '') {
                // TODO: get first uncompleted or first
                setTimeout(() => {
                    const audio = $(that._el.nativeElement).find('ol [routerLink*="' + series + '"]').first().attr('routerLink');
                    return that.router.navigate([audio]);
                });
                return '';
            } else {
                this.audio.nextUp = this.audio.AWS + encodeURIComponent(params['audio']);
                const match = (/Day_([0-9]+)|_[0-9]+_([0-9]+)/ig).exec(params['audio'].replace(/ |%20/ig, '_'));
                return '_day_' + parseInt(match[1] || match[2]);
            }
        });
        setTimeout(() => {

        });
    }

    goBackToCourse() {
        this.series$.subscribe((series) => this.router.navigate(['/discovery/' + series]));
    }
}

