import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'bc-account-links',
  templateUrl: './account-links.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountLinksComponent implements OnInit {


    constructor(
        public router: Router,
        public authService: AuthService) {

    }

    ngOnInit() {

    }

}
