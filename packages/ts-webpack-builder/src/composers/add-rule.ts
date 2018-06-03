import { Condition, Loader, Rule } from 'webpack';

import { ConfigComposer, setProperty } from './';

export type Conditions = Condition | Condition[];

/**
 * Add a rule to config
 *
 * It's possible to add a full specified block of rule:
 *
 * ```typescript
 * addRule({
 *  test: /\.js$/,
 *  enforce: 'pre',
 *  loader: 'source-map-loader',
 * })
 * ```
 *
 * Or a shortcut for simple rules:
 *
 * ```typescript
 * addRule(/\.tsx?$/, 'awesome-typescript-loader', [/node_modules/])
 *
 * // equivalent of
 * addRule({ test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: [/node_modules/] })
 * ```
 *
 * @param testOrRule
 * @param loader
 * @param exclude
 */
export function addRule(testOrRule: Conditions | Rule, loader?: Loader, exclude?: Conditions): ConfigComposer;
export function addRule(testOrRule: Rule): ConfigComposer {
  const rules: Rule[] = [];
  if (arguments.length == 1) {
    rules.push(testOrRule as Rule);
  } else {
    const loader = arguments[1];
    const exclude = arguments[2];
    rules.push({ test: testOrRule as Condition, loader, exclude });
  }
  return setProperty('module', { rules });
}
