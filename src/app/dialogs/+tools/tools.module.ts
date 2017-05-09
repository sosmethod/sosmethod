import {NgModule} from '@angular/core';
import {ToolDialogComponent} from './tool';
import {COMMON_MODULES} from '../../shared/common.module';
import {routing} from './tools.routing';
import {DialogGuard} from '../dialog-guard';


export const COMPONENTS = [
    ToolDialogComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    providers: [DialogGuard],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class ToolsModule {
}
