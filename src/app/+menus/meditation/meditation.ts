import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../layout/layout-service';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {Meditations} from '../../shared/meditations';


@Component({
    selector: 'bc-mediation',
    templateUrl: './meditation.html',
    styleUrls: ['../discovery/discovery.scss']
})
export class MeditationComponent extends DiscoveryComponent implements OnInit, AfterViewInit {
    constructor(public route: ActivatedRoute,
                public layout: LayoutService,
                public auth: AuthGuard) {
        super(route, layout, auth);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.series = params['discovery'];
            this.links = this.getLinks();
            if (this.init) {
                setTimeout(() => {
                    this.createSubMenus(this.series, this.isDiscovery());
                });
            }
        });
        this.auth.subj.subscribe(() => {
            this.links = this.getLinks();
            this.seriesLinks = this.getSeries();
        });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    getLinks(): any {
        return Meditations.links
            .filter(l => l.indexOf(this.series) > -1)
            .map((l) => {
                return Meditations.getLinkProps(l, null, this.auth.user);
            });
    }

    getSeries(): any {
        const keys = Object.keys(Meditations.colorSeries);
        return keys
            .map((l) => {
                return Meditations.getLinkProps(l, null, this.auth.user);
            });
    }
}


