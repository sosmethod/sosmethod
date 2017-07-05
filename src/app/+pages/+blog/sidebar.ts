import {Component, Input} from '@angular/core';
import {LayoutService} from '../../layout/layout-service';
import {Environment} from '../../../../config/environment.i';

@Component({
    selector: 'bc-blog-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss']
})
export class BlogSidebarComponent {
    @Input() open = false;
    public fb = Environment.env.fbUrl;
    public tw = Environment.env.twUrl;


    constructor(public layout: LayoutService) {
    }

}
