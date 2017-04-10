import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'bc-logout',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(
        public router: Router,
        public authService: AuthService) {
    }

    ngOnInit() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

}

