import { Component, Input } from '@angular/core';

@Component({
    selector: 'bc-sidenav',
    templateUrl: './main.html',
    styleUrls: ['./main.scss']
})
export class MainComponent {
    @Input() open = false;
}
