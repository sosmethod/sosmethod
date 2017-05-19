import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'bc-answer-recommend',
    templateUrl: './answer-recommend.html',
    styleUrls: ['./answer-recommend.scss']
})
export class AnswerRecommendComponent {
    @Input() form: FormGroup;
    @Input() name: string;
    value = 0;

    constructor() {
    }

}


