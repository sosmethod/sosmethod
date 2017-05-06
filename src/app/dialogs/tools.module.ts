import {NgModule} from '@angular/core';

import {ToolDialogComponent} from './tools/tool';

import {COMMON_MODULES} from '../shared/common.module';


export const COMPONENTS = [
    ToolDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ToolsModule {
}
