import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';


@Component({
    selector: 'bc-meditations',
    templateUrl: './meditations.html',
    styleUrls: ['./meditations.scss']
})
export class MeditationsComponent implements OnInit {
    public series$: Observable<string>;
    public discovery: Observable<string>;

    constructor(public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
        this.series$ = this.route.params.map(params => {
            return params['meditation'];
        });
        this.discovery = this.route.params.map(params => {
            return params['discovery'];
        });
    }

    goBackToCourse() {
        this.series$.withLatestFrom(this.discovery, (series, discovery) => ({series, discovery}))
            .subscribe(({series, discovery}) => this.router.navigate(['/meditation/' + discovery]));
    }
}


