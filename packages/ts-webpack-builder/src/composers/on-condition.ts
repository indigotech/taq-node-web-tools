import * as merge from 'webpack-merge';

import { ConfigComposer } from './';

/**
 * Add an array of composers if the condition is true
 *
 * ```typescript
 * onCondition(process.env.ENV === 'development', [
 *   addRule(/\.tsx?$/, 'awesome-typescript-loader')
 * ])
 * ```
 *
 * @param condition
 * @param composers
 */
export function onCondition(condition: boolean, composers: ConfigComposer[]) : ConfigComposer {
  return () => {
    if (condition) {
      return composers.reduce(
        (config, composer) => merge(config, composer()),
        {},
      );
    }
    return {};
  };
}
