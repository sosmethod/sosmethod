import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'bc-answer',
    templateUrl: './answer.html',
    styleUrls: ['./answer.scss']
})
export class AnswerComponent {
    @Input() form: FormGroup;
    @Input() name: string;
    @Input() model: { [key: string]: any };
    value = 0;

    constructor() {
    }

}


