import {Component, ChangeDetectorRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';


@Component({
    selector: 'bc-language',
    templateUrl: './language.html'
})
export class LanguageMenuComponent {
    language: Subject<string> = new Subject();
    langs: Array<string>;

    constructor(private ref: ChangeDetectorRef, private translate: TranslateService) {
        const that = this;
        this.translate.addLangs(['en', 'fr', 'tr']);
        this.translate.setDefaultLang('en');
        this.langs = this.translate.getLangs();
        this.translate.use(this.translate.currentLang || 'en');
        setTimeout(() => that.language.next(that.translate.currentLang || 'en'));
    }

    changeLanguage(lang: string) {
        // TODO: find a way to do this that is less janky
        const that = this;
        this.translate.use(lang.match(/en|fr|tr/) ? lang : 'en');
        setTimeout(() => that.language.next(that.translate.currentLang || 'en'));
        this.ref.detectChanges();
    }

}
