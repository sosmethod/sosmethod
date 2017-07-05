import {NgModule} from '@angular/core';
import {DiscoveryComponent} from './discovery/discovery';
import {MeditationComponent} from './meditation/meditation';
import {CourseComponent} from './course/course';
import {COMMON_MODULES} from '../shared/shared.module';
import {routing} from './menus.routing';

export const COMPONENTS = [
    CourseComponent,
    DiscoveryComponent,
    MeditationComponent,
];


@NgModule({
    imports: [
        ...COMMON_MODULES,
        routing
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class MenusModule {
}


