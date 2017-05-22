import {Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../layout/layout-service';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';
import {Series} from '../../shared/series';

@Component({
    selector: 'bc-discovery',
    templateUrl: './discovery.html',
    styleUrls: ['./discovery.scss']
})
export class DiscoveryComponent implements OnInit, AfterViewInit {

    @ViewChild('discovery') discovery: any;
    @ViewChild('discoveryLeaf') discoveryLeaf: any;
    public width: number;
    public series: string;
    public links: any;
    public seriesLinks: any;
    public init = false;

    constructor(public route: ActivatedRoute,
                public layout: LayoutService,
                public auth: AuthGuard) {
    }

    isDiscovery() {
        return this.constructor === DiscoveryComponent;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        const that = this;
        if ($(that.discoveryLeaf.nativeElement).width() !== that.width) {
            that.width = $(that.discoveryLeaf.nativeElement).width();
            that.createMenus(that.isDiscovery(), false);
            if (that.series) {
                that.createSubMenus(that.series, that.isDiscovery(), false);
            }
        }
    }

    getLinks(): any {
        return Series.links
            .filter(l => l.indexOf(this.series) > -1)
            .map((l) => {
                return Series.getLinkProps(l, null, this.auth.user);
            });
    }

    getSeries(): any {
        const keys = Object.keys(Series.colorSeries);
        return keys
            .map((l) => {
                return Series.getLinkProps(l, null, this.auth.user);
            });
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
        if (this.series && this.series !== '') {
            this.createSubMenus(this.series, this.isDiscovery());
        } else {
            this.createMenus(this.isDiscovery());
        }
        this.init = true;
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
        const link = firstLevel.filter('[href*="' + d + '"]');
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

}


