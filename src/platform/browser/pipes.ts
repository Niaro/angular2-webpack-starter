/*
 * These are globally available pipes in any template
 */

import {provide, PLATFORM_PIPES} from 'angular2/core';
import {APP_PIPES} from '../app-pipes';

export const PIPES = [
  provide(PLATFORM_PIPES, {useValue: APP_PIPES, multi: true})
];
