import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';

import { ConfigComposer } from './composers';

/**
 * Creates a webpack config by invoking each composer
 * @param composers
 */
export function createConfig(composers: ConfigComposer[]): Configuration {
  return composers.reduce((config, composer) => merge(config, composer()), {});
}
