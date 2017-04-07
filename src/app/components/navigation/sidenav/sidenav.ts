import { Component, Input } from '@angular/core';

@Component({
  selector: 'bc-sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {
  @Input() open = false;
}
