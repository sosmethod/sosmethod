import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DiscoverySeriesComponent} from '../discovery/discovery-series';
import {AudioService} from '../../services/audio.service';
import 'rxjs/add/operator/withLatestFrom';


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
                public audio: AudioService) {
        this.audio.ended.subscribe(() => {
            const meditation = $(this.discovery.nativeElement).find('a[routerLink*="/meditations/"]:visible');
            if (meditation.length > 0) {
                this.router.navigate([meditation.first().attr('routerLink')]);
            }
        });
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


