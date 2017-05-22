import { Component, Input } from '@angular/core';

@Component({
    selector: 'bc-main-menu',
    templateUrl: './main.html',
    styleUrls: ['./main.scss']
})
export class MainComponent {
    @Input() open = false;
}
