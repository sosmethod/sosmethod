import {Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';


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
                    const match = (/Day_([0-9]+)|_[0-9]+_([0-9]+)/ig).exec(params['audio'].replace(/ |%20/ig, '_'));
                    return '_day_' + parseInt(match[1] || match[2]);
                }
            });
    }

}


