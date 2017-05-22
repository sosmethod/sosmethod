import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Series} from '../../shared/series';


@Component({
    selector: 'bc-discovery-subtext',
    templateUrl: './discovery-subtext.html',
    styleUrls: ['./discovery-subtext.scss']
})
export class DiscoverySubtextComponent implements OnInit {
    public series: string;
    public day: string;

    constructor(public route: ActivatedRoute, public router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.series = (this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day') + '_' + params['discovery'];
            if (params['audio']) {
                const match = Series.seriesRegex(params['audio']);
                this.day = '_day_' + parseInt(match[1] || match[2]);
            } else {
                this.day = '';
            }
        });
    }
}
