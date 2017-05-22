import {Component, Input} from '@angular/core';
import {LayoutService} from '../layout-service';
import {MdDialog} from '@angular/material';
import {AuthUser} from '../../+dialogs/+auth/auth-user';
import {AuthGuard} from '../../+dialogs/+auth/auth-guard';


@Component({
    selector: 'bc-tools-menu',
    templateUrl: './tools.html',
    styleUrls: ['./tools.scss']
})
export class ToolsMenuComponent {
    @Input() public open = false;

    static isLocked(u: AuthUser, seriesUri: string) {
        if (seriesUri.indexOf('stop_drop') > -1) {
            return false;
        }
        return !u;
    }

    constructor(public layout: LayoutService, public dialog: MdDialog, public auth: AuthGuard) {
    }

    getLocked(seriesUri: string) {
        return ToolsMenuComponent.isLocked(this.auth.user, seriesUri);
    }

}
