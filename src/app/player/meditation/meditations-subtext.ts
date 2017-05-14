import {Component, OnInit, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AudioService} from '../../layout/audio.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'bc-meditations-subtext',
    templateUrl: './meditations-subtext.html',
    styleUrls: ['./meditations-subtext.scss']
})
export class MeditationsSubtextComponent implements OnInit, AfterViewInit, OnDestroy {
    series: string;
    public day: string;
    public audioUrl: string;
    public routerSub: Subscription;
    public routeSub: Subscription;
    public loaded = false;

    constructor(public router: Router,
                public route: ActivatedRoute,
                private _el: ElementRef,
                public audio: AudioService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.series = params['meditation'];
            if (!params['audio'] || params['audio'] === '') {
                this.audioUrl = '';
            } else {
                this.audioUrl = params['audio'];
            }
        });
    }

    ngOnDestroy() {
        if (typeof this.routerSub !== 'undefined') {
            this.routerSub.unsubscribe();
        }
        this.routeSub.unsubscribe();
    }

    ngAfterViewInit() {
        if (this.audioUrl === '') {
            // TODO: get first uncompleted or first
            const audio = $(this._el.nativeElement).find('[routerLink*="' + this.series + '"]').first().attr('routerLink');
            this.router.navigate([audio], {replaceUrl: true});
            return;
        } else {
            this.audio.Play(encodeURIComponent(this.audioUrl));
            const day = $(this._el.nativeElement).find('[routerLink*="' + this.audioUrl + '"]').index();
            this.audio.playerPositions.next($(this._el.nativeElement).find('a[href*=".mp3"]').length);
            this.audio.position.next(day);
            this.day = '_day_' + day;
        }
        if (!this.loaded) {
            this.loaded = true;
            setTimeout(() => {
                this.routerSub = this.router.events.filter(e => e instanceof NavigationEnd
                && this.router.url.indexOf('meditations') > -1)
                    .subscribe(() => this.ngAfterViewInit());
            });
        }
    }
}

