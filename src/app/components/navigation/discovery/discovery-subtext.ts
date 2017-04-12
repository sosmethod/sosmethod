import {Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild, HostBinding} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'bc-discovery-subtext',
    templateUrl: './discovery-subtext.html',
    styleUrls: ['./discovery-subtext.scss']
})
export class DiscoverySubtextComponent implements OnInit {
    series$: Observable<string>;
    public day$: Observable<string>;

    constructor(public route: ActivatedRoute) {

    }

    ngOnInit() {
        this.series$ = this.route.params.map(params => {
            return params['discovery'];
        });
        this.day$ = this.route.params.map(params => {
            const match = (/Day_([0-9]+)|_[0-9]+_([0-9]+)/ig).exec(params['audio'].replace(/ |%20/ig, '_'));
            return '_day_' + parseInt(match[1] || match[2]);
        });
    }
}