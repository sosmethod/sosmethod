import {Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DiscoverySeriesComponent} from "../discovery/discovery-series";


@Component({
    selector: 'bc-meditate',
    templateUrl: './meditate.html',
    styleUrls: ['./meditate.scss']
})
export class MeditateComponent implements OnInit {
    @ViewChild('discovery') discovery: any;
    public series$: Observable<string>;
    public day$: Observable<string>;

    constructor(public route: ActivatedRoute,
                public router: Router,
                private _el: ElementRef) {
    }

    ngOnInit() {
        this.series$ = this.route.params.map(params => {
            return params['discovery'];
        });
        this.day$ = this.route.params.withLatestFrom(this.series$, (params, series) => ({params, series}))
            .map(({params, series}) => {
                if (!params['audio'] || params['audio'] === '') {
                    return '';
                } else {
                    const match = DiscoverySeriesComponent.seriesRegex(params['audio']);
                    return '_day_' + parseInt(match[1] || match[2]);
                }
            });
    }

}


