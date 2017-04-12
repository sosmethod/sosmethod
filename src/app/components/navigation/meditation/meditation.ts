import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import {DiscoveryComponent} from "../discovery/discovery";


@Component({
    selector: 'bc-mediation',
    templateUrl: './meditation.html',
    styleUrls: ['../discovery/discovery.scss']
})
export class MeditationComponent extends DiscoveryComponent implements OnInit {


    constructor() {
        super();
    }

    ngOnInit() {
        this.createMenus(false);
    }

}


