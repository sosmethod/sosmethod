import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'bc-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class SecureHomeComponent implements OnInit {

    constructor(public router: Router) {

    }

    ngOnInit() {

    }
}
