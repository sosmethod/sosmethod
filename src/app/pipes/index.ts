import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas';
import { EllipsisPipe } from './ellipsis';
import { TranslateService } from '@ngx-translate/core';


export const PIPES = [
  AddCommasPipe,
    EllipsisPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
