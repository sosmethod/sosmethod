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
    public series: Observable<string>;
    public discovery: Observable<string>;

    constructor(public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.series = params['meditation'];
            this.discovery = params['discovery'];
        });
    }

    goBackToCourse() {
        this.router.navigate(['/course/meditation/' + this.discovery]);
    }
}


