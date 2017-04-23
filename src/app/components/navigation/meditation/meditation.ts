import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../../services/layout';
import {AuthGuard} from "../../../guards/auth";


@Component({
    selector: 'bc-mediation',
    templateUrl: './meditation.html',
    styleUrls: ['../discovery/discovery.scss']
})
export class MeditationComponent extends DiscoveryComponent implements OnInit {

    constructor(public route: ActivatedRoute, public layout: LayoutService, public auth: AuthGuard) {
        super(route, layout, auth);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}


