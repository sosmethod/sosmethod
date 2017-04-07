import { Component, Output, EventEmitter, Input,  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'bc-language',
  templateUrl: './language.html'
})
export class LanguageMenuComponent {
    language: string;
    langs: Array<string>;

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en', 'fr']);
        this.translate.setDefaultLang('en');
        this.langs = this.translate.getLangs();
        this.language = this.translate.currentLang || 'en';

        this.translate.use(this.language.match(/en|fr/) ? this.language : 'en');
    }

    changeLanguage(lang: string) {
        this.translate.use(lang.match(/en|fr/) ? lang : 'en');
    }

}
