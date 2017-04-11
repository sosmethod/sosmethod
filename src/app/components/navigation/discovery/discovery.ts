import {Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild} from '@angular/core';


@Component({
    selector: 'bc-discovery',
    templateUrl: './discovery.html',
    styleUrls: ['./discovery.scss']
})
export class DiscoveryComponent implements OnInit {
    @ViewChild('discovery') discovery: any;


    constructor() {

    }

    ngOnInit() {
        this.createMenus(true);
    }

    createMenus(isDiscovery: boolean) {
        const that = this;
        const discovery = $(this.discovery.nativeElement);
        discovery.addClass('open');
        const firstLevel = discovery.find('> a');
        const degrees = 5 / 7 * 360 / firstLevel.length;
        const degreesI = (isDiscovery ? -1.7 : -2.5) * degrees;
        firstLevel.each(function (i) {
            that.sizeNode.apply(this, [degreesI + (isDiscovery ? -i : i) * degrees, 100])
        });
    }

    sizeNode(degrees: number, lineLength: number) {
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
        $(this).css({height: 0, width: 0})
            .animate({left: left, top: top, width: naturalWidth, height: naturalHeight}, 1000, function () {
                $(this).stop().css({width: '', height: ''});
            });
        $(this).find('b').css({
            width: 50,
            opacity: 0,
            transform: 'rotate(' + Math.round(180 - degrees + 90) + 'deg)'
        }).animate({width: bNaturalWidth, opacity: 1}, 1000, function () {
            $(this).stop().css({width: '', height: ''});
        });
    }

}


