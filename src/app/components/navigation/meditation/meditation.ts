import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'bc-mediation',
    templateUrl: './meditation.html',
    styleUrls: ['../discovery/discovery.scss']
})
export class MeditationComponent extends DiscoveryComponent implements OnInit {

    constructor(public route: ActivatedRoute) {
        super(route);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}


