import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {DiscoverySeriesComponent} from './discovery-series';


@Component({
    selector: 'bc-discovery-subtext',
    templateUrl: './discovery-subtext.html',
    styleUrls: ['./discovery-subtext.scss']
})
export class DiscoverySubtextComponent implements OnInit {
    public series$: Observable<string>;
    public day$: Observable<string>;

    constructor(public route: ActivatedRoute, public router: Router) {

    }

    ngOnInit() {
        this.series$ = this.route.params.map(params => {
            return (this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') + '_' + params['discovery'];
        });
        this.day$ = this.route.params.map(params => {
            if (params['audio']) {
                const match = DiscoverySeriesComponent.seriesRegex(params['audio']);
                return '_day_' + parseInt(match[1] || match[2]);
            } else {
                return '';
            }
        });
    }
}
