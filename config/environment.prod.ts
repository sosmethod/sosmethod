import {Environment} from './environment.i';
import {environment as commonConfig} from './environment';

export const environment: Environment = Object.apply(commonConfig, {
    production: true
});

