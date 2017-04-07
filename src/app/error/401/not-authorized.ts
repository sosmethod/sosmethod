import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'bc-not-authorized',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-authorized.html',
  styleUrls: ['./not-authorized.scss']
})
export class NotAuthorizedPageComponent { }
