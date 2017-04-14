import {Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'bc-meditations',
    templateUrl: './meditations.html',
    styleUrls: ['./meditations.scss']
})
export class MeditationsComponent implements OnInit {
    @ViewChild('discovery') discovery: any;
    public series$: Observable<string>;
    public day$: Observable<string>;

    constructor(public route: ActivatedRoute,
                public router: Router,
                private _el: ElementRef) {
    }

    ngOnInit() {
        this.series$ = this.route.params.map(params => {
            return params['meditation'];
        });
        this.day$ = this.route.params.withLatestFrom(this.series$, (params, series) => ({params, series}))
            .map(({params, series}) => {
                if (!params['audio'] || params['audio'] === '') {
                    // TODO: get first uncompleted or first
                    setTimeout(() => {
                        const audio = $(this._el.nativeElement).find('ol [routerLink*="' + series + '"]').first().attr('routerLink');
                        return this.router.navigate([audio]);
                    });
                    return '';
                } else {
                    const match = (/Day_([0-9]+)|_[0-9]+_([0-9]+)/ig).exec(params['audio'].replace(/ |%20/ig, '_'));
                    return '_day_' + parseInt(match[1] || match[2]);
                }
            });
    }

}


