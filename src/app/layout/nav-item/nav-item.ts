import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'bc-nav-item',
    templateUrl: './nav-item.html',
    styleUrls: ['./nav-item.scss']
})
export class NavItemComponent {
    @Input() icon = '';
    @Input() hint = '';
    @Input() routerLink: string | any[] = '/';
    @Output() activate = new EventEmitter();
}
