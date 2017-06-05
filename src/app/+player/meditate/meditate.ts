import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {Series} from '../../shared/series';
import {Meditations} from '../../shared/meditations';


@Component({
    selector: 'bc-meditate',
    templateUrl: './meditate.html',
    styleUrls: ['./meditate.scss']
})
export class MeditateComponent implements OnInit {
    public series: string;
    public day: string;
    public links: { color: string, url: string, label: string, tooltip: string }[];

    static getLinkProps(l: string) {
        if (l.indexOf('/tool/') > -1 || l.indexOf('/bonus/') > -1) {
            return {
                url: l,
                color: l.indexOf('/tool/') > -1 ? 'tool' : 'bonus',
                label: l.indexOf('/tool/') > -1 ? 'tool' : 'bonus',
                tooltip: ''
            };
        } else {
            return {
                url: '/play/meditations/' + l,
                color: 'sos-circle sos-circle-mini ' + Meditations.colorSeries[l.split('/')[0]],
                label: 'meditate',
                tooltip: 'MEDITATIONS.MEDITATE.' + l.split('/')[1]
            };
        }
    }

    constructor(public route: ActivatedRoute,
                public router: Router,
                public audio: AudioService) {
        this.audio.ended.subscribe(() => {
            const seriesLength = this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day';
            const links = Series.dailyMeditations[seriesLength + '/' + this.series];
            const day = parseInt(this.day.split('_')[2]);
            if (typeof links !== 'undefined') {
                this.router.navigate([links[day - 1][0]]);
            }
        });
        this.route.params.subscribe(params => {
            this.series = params['discovery'];
            if (!params['audio'] || params['audio'] === '') {
                this.day = '';
            } else {
                const match = Series.seriesRegex(params['audio']);
                const day = parseInt(match[1] || match[2]);
                this.day = '_day_' + day;
                const seriesLength = this.router.url.indexOf('_11_day') > -1 ? '_11_day' : '_5_day';
                const links = Series.dailyMeditations[seriesLength + '/' + this.series];
                if (typeof links === 'undefined') {
                    this.links = [];
                    return;
                }
                this.links = links[day - 1].map(l => MeditateComponent.getLinkProps(l));
            }
        });
    }

    ngOnInit() {
    }

}


