import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'bc-mediation',
    templateUrl: './meditation.html',
    styleUrls: ['../discovery/discovery.scss']
})
export class MeditationComponent extends DiscoveryComponent implements OnInit {
    public series$: Observable<string>;

    constructor(public route: ActivatedRoute) {
        super(route);
    }

    ngOnInit() {
        this.series$ = this.route.params.map(params => {
            return params['discovery'];
        });
        this.series$.subscribe(d => {
            setTimeout(() => {
                if (d && d !== '') {
                    this.createSubMenus(d, false);
                } else {
                    this.createMenus(false);
                }
            });
        });
    }

}


