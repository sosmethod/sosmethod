import {
    Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input, ViewChild, HostBinding,
    ElementRef
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../../services/audio';


@Component({
    selector: 'bc-meditations-subtext',
    templateUrl: './meditations-subtext.html',
    styleUrls: ['./meditations-subtext.scss']
})
export class MeditationsSubtextComponent implements OnInit {
    series$: Observable<string>;
    public day$: Observable<string>;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private _el: ElementRef,
        public audio: AudioService) {

    }

    ngOnInit() {
        const that = this;
        this.series$ = this.route.params.map(params => {
            return params['meditation'];
        });
        this.day$ = this.route.params.withLatestFrom(this.series$, (params, series) => ({params, series}))
            .map(({params, series}) => {
                if (!params['audio'] || params['audio'] === '') {
                    // TODO: get first uncompleted or first
                    setTimeout(() => {
                        const audio = $(that._el.nativeElement).find('[routerLink*="' + series + '"]').first().attr('routerLink');
                        return that.router.navigate([audio], {replaceUrl: true});
                    });
                    return '';
                } else {
                    const day = $(that._el.nativeElement).find('[routerLink*="' + params['audio'] + '"]').index();
                    this.audio.nextUp = this.audio.AWS + encodeURIComponent(params['audio']);
                    setTimeout(() => {
                        that.audio.playerPositions.next($(that._el.nativeElement).find('a[href*=".mp3"]').length);
                        that.audio.position.next(day);
                    });
                    return '_day_' + day;
                }
            });
    }
}

