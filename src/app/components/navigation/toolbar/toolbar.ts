import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'bc-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();

  constructor(private ref: ChangeDetectorRef) {

  }

}
