import {NgModule} from '@angular/core';
import {COMMON_MODULES} from '../../shared/shared.module';
import {routing} from './blog.routing';
import {SharedPagesModule} from '../shared/shared-pages.module';
import {BlogComponent} from './blog';
import {BlogSidebarComponent} from './sidebar';
export const COMPONENTS = [
    BlogComponent,
    BlogSidebarComponent
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        SharedPagesModule,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class BlogModule {
}
