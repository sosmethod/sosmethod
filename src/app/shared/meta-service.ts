import {Inject, Injectable} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
const isDefined = (val: any) => typeof val !== 'undefined';

@Injectable()
export class MetaService {

    static _findLastChild(activatedRoute: ActivatedRoute) {
        const snapshot = activatedRoute.snapshot;

        let child = snapshot.firstChild;
        while (child.firstChild !== null) {
            child = child.firstChild;
        }

        return child.data;
    }

    constructor(public router: Router,
                public route: ActivatedRoute,
                @Inject(DOCUMENT) private document: any) {
        this.router.events
            .filter(e => e instanceof NavigationStart && e.url.indexOf('/fb') > -1)
            .withLatestFrom(route.queryParams, (e: NavigationStart, p) => ({e, p}))
            .subscribe(({e, p}) => {
                const image = (/\?fb=(.*?)(&|$)/ig).exec(e.url.toString())[1];
                const meta: { [key: string]: string } = {
                    'og:image': 'https://sosmethod.io/' + image + '.jpeg',
                    'og:image:url': 'https://sosmethod.io/' + image + '.jpeg',
                    'og:image:secure_url': 'https://sosmethod.io/' + image + '.jpeg',
                    'og:image:type': 'image/jpeg',
                    'og:description': 'Discover mindful tools for well-being; rapid stress relief, focus, and peace of mind.',
                    'og:url': 'https://sosmethod.io/fb?fb=' + image + '',
                    'og:title': 'The SOS Method',
                    'og:type': 'article',
                    'twitter:card': 'summary',
                    'twitter:site': '@thesosmethod',
                    'twitter:title': 'The SOS Method | Meditation Reinvented',
                    'twitter:description': 'Discover mindful tools for well-being; rapid stress relief, focus, and peace of mind.',
                    'twitter:image': 'https://sosmethod.io/' + image + '.jpeg',
                };
                for (const i in meta) {
                    if (meta.hasOwnProperty(i)) {
                        this.setTag(i, meta[i]);
                    }
                }
                this.router.navigate(['/']);
            })
        ;
    }

    private _getOrCreateMetaTag(name: string): HTMLElement {
        let el: HTMLElement = this.document.querySelector(`meta[name='${name}']`);
        if (!el) {
            el = this.document.createElement('meta');
            el.setAttribute('property', name);
            this.document.head.appendChild(el);
        }
        return el;
    }

    setTag(tag: string, value: string): MetaService {
        if (tag === 'title' || tag === 'titleSuffix') {
            throw new Error(`Attempt to set ${tag} through 'setTag': 'title' and 'titleSuffix' are reserved tag names.
      Please use 'MetaService.setTitle' instead`);
        }
        const tagElement = this._getOrCreateMetaTag(tag);
        const tagStr = isDefined(value) ? value : '';
        tagElement.setAttribute('content', tagStr);
        if (tag === 'description') {
            const ogDescElement = this._getOrCreateMetaTag('og:description');
            ogDescElement.setAttribute('content', tagStr);
        }
        return this;
    }
}
