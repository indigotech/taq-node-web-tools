import { Plugin } from 'webpack';

import { ConfigComposer, setProperty } from './';

/**
 * Add one or more plugins to config
 * @param plugins
 */
export function addPlugins(...plugins: Plugin[]): ConfigComposer {
  return setProperty('plugins', plugins);
}
