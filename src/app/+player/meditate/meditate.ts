import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {Series} from '../../shared/series';


@Component({
    selector: 'bc-meditate',
    templateUrl: './meditate.html',
    styleUrls: ['./meditate.scss']
})
export class MeditateComponent implements OnInit {
    @ViewChild('discovery') discovery: any;
    public series: string;
    public day: string;

    constructor(public route: ActivatedRoute,
                public router: Router,
                public audio: AudioService) {
        this.audio.ended.subscribe(() => {
            const meditation = $(this.discovery.nativeElement).find('a[routerLink*="/meditations/"]:visible');
            if (meditation.length > 0) {
                this.router.navigate([meditation.first().attr('routerLink')]);
            }
        });
        this.route.params.subscribe(params => {
            this.series = params['discovery'];
            if (!params['audio'] || params['audio'] === '') {
                this.day = '';
            } else {
                const match = Series.seriesRegex(params['audio']);
                this.day = '_day_' + parseInt(match[1] || match[2]);
            }
        });
    }

    ngOnInit() {
    }

}


