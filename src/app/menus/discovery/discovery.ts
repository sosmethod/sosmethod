import {Component, OnInit, ViewChild, HostListener, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../layout/layout-service';
import {AuthGuard} from '../../dialogs/+auth/auth-guard';
import {DiscoverySeriesComponent} from '../../player/discovery/discovery-series';
import {AuthUser} from '../../dialogs/+auth/auth-user';
import 'rxjs/add/operator/withLatestFrom';

@Component({
    selector: 'bc-discovery',
    templateUrl: './discovery.html',
    styleUrls: ['./discovery.scss']
})
export class DiscoveryComponent implements OnInit {
    @ViewChild('discovery') discovery: any;
    @ViewChild('discoveryLeaf') discoveryLeaf: any;

    public series: Observable<string>;
    public width: number;
    private _series: string;

    static isCompleted(user: AuthUser, seriesUri: string) {
        const urls = user && typeof user.completed !== 'undefined'
            ? Object.keys(user.completed).map(c => user.completed[c])
                .filter(c => c.indexOf(seriesUri) > -1)
                .map(l => {
                    const match = DiscoverySeriesComponent.seriesRegex(l);
                    return parseInt(match[1] || match[2]);
                })
            : [];
        return urls.filter((u, i) => urls.indexOf(i + 1) > -1).length === (seriesUri.indexOf('_11_day') > -1 ? 11 : 5);
    }

    static isLocked(u: AuthUser, seriesUri: string) {
        if (seriesUri.indexOf('_5_day') > -1 && seriesUri.indexOf('essentials') > -1) {
            return false;
        }
        if (u && !DiscoveryComponent.isCompleted(u, '_11_day/essentials') &&
            seriesUri.indexOf('_11_day') > -1 && seriesUri.indexOf('essentials') > -1) {
            return false;
        }
        return !(u && DiscoveryComponent.isCompleted(u, '_11_day/essentials'));
    }

    constructor(public route: ActivatedRoute, public layout: LayoutService, public auth: AuthGuard) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        const that = this;
        const isDiscovery = that.constructor === DiscoveryComponent;
        if ($(that.discoveryLeaf.nativeElement).width() !== that.width) {
            that.width = $(that.discoveryLeaf.nativeElement).width();
            that.createMenus(isDiscovery, false);
            if (that._series) {
                that.createSubMenus(that._series, isDiscovery, false);
            }
        }
    }

    ngOnInit() {
        const that = this;
        const isDiscovery = that.constructor === DiscoveryComponent;
        this.series = this.route.params.map(params => {
            return params['discovery'];
        });
        this.series.subscribe(d => {
            this._series = d;
            setTimeout(() => {
                if (d && d !== '') {
                    that.createSubMenus(d, isDiscovery);
                } else {
                    that.createMenus(isDiscovery);
                }
            });
            setTimeout(() => {
                that.circleStatus.apply(that, [this.auth.user]);
            });
        });
        this.auth.subj.subscribe(user => {
            setTimeout(() => {
                that.circleStatus.apply(that, [user]);
            });
        });
    }


    public circleStatus(u: AuthUser | null) {
        $(this.discoveryLeaf.nativeElement).find('a[href]').each((i, elem) => {
            const link = $(elem).attr('href').replace('#/', '');
            if (DiscoveryComponent.isLocked(u, link)) {
                $(elem).addClass('locked');
            } else {
                $(elem).removeClass('locked');
            }
            if (DiscoveryComponent.isCompleted(u, link)) {
                $(elem).addClass('completed');
            } else {
                $(elem).removeClass('completed');
            }
        });
    }

    public createMenus(isDiscovery: boolean, animated?: boolean) {
        const that = this;
        const discovery = $(this.discovery.nativeElement);
        discovery.addClass('open');
        this.layout.focusElement.next(this.discovery);
        const firstLevel = discovery.find('> a');
        const degrees = 5 / 7 * 360 / firstLevel.length;
        const degreesI = (isDiscovery ? -1.7 : -2.5) * degrees;
        firstLevel.each(function (i) {
            that.sizeNode.apply(this, [degreesI + (isDiscovery ? -i : i) * degrees, 100, animated]);
        });
    }

    public sizeNode(degrees: number, lineLength: number, animated?: boolean) {
        $(this).find('b').stop().css({
            width: '', height: '', transform: ''
        });
        const bNaturalWidth = $(this).find('b').outerWidth();
        const rad = degrees * (Math.PI / 180);
        const top = Math.round(Math.cos(rad) * (bNaturalWidth + lineLength));
        const left = Math.round(Math.sin(rad) * (bNaturalWidth + lineLength));
        const startTop = Math.round(Math.cos(rad) * lineLength);
        const startLeft = Math.round(Math.sin(rad) * lineLength);
        $(this).stop().css({
            top: startTop, left: startLeft,
            width: '', height: ''
        });
        const naturalHeight = $(this).outerHeight(), naturalWidth = $(this).outerWidth();
        if (animated !== false) {
            $(this).css({height: 0, width: 0})
                .animate({left: left, top: top, width: naturalWidth, height: naturalHeight}, 1000, function () {
                    $(this).stop().css({width: '', height: ''});
                });
        } else {
            $(this).css({left: left, top: top, height: naturalHeight, width: naturalWidth});
        }
        if (animated !== false) {
            $(this).find('b').css({
                width: 50,
                opacity: 1,
                transform: 'rotate(' + Math.round(180 - degrees + 90) + 'deg)'
            }).animate({width: bNaturalWidth, opacity: 1}, 1000, function () {
                $(this).stop().css({width: '', height: ''});
            });
        } else {
            $(this).find('b').stop().css({
                transform: 'rotate(' + Math.round(180 - degrees + 90) + 'deg)',
                opacity: 1,
                width: '', height: ''
            });
        }
    }

    public createSubMenus(d: string, isDiscovery: boolean, animated?: boolean) {
        const that = this;
        const discovery = $(this.discoveryLeaf.nativeElement);
        const firstLevel = $(this.discovery.nativeElement).find('> a');
        const link = firstLevel.filter('[routerLink*="' + d + '"]');
        link.stop().css({
            width: '', height: ''
        });
        const course = $('#course-menu');
        const parentCircleWidth = link.outerWidth() / 2;
        const lineLength = course.outerWidth() / 2;
        const linkI = firstLevel.index(link);
        if (!$(this.discovery.nativeElement).is('.open')) {
            that.createMenus(isDiscovery, false);
        }
        this.layout.focusElement.next(new ElementRef(link[0]));
        // reset the border size to determine how long the node should be
        link.find('b').css({
            width: '', height: '', transform: ''
        });
        const bNaturalWidth = link.find('b').outerWidth() + lineLength;
        const degrees = 5 / 7 * 360 / firstLevel.length;
        const degreesI = ((isDiscovery ? -1.7 : -2.5) + (isDiscovery ? -linkI : linkI)) * degrees;
        const rad = degreesI * (Math.PI / 180);
        const top = Math.round(Math.cos(rad) * bNaturalWidth);
        const left = Math.round(Math.sin(rad) * bNaturalWidth);
        discovery.css({left: left, top: top});
        link.find('b').css('transform', 'rotate(' + Math.round(180 - degreesI + 90) + 'deg)');

        // (this).find('b').css('transform', 'rotate('+ Math.round(180 - degrees * degreesI + 90) +'deg)');
        const secondLevel = discovery.find('> a');
        const degrees2 = 30;
        const degreesI2 = 100 - secondLevel.not('.popout').length * degrees2 + degreesI;
        const addDegrees = parseInt(link.data('degrees')) || 0;
        let i2 = 0;
        secondLevel.each(function (i) {
            let add = addDegrees;
            if ($(this).is('.popout')) {
                i2++;
                add = addDegrees + degrees2 / 2;
            }
            that.sizeNode.apply(this, [degreesI2 + (isDiscovery
                ? -(i - i2)
                : (i - i2)) * degrees2 + add, parentCircleWidth, animated]);
        });
    }

    doNothing() {

    }
}


