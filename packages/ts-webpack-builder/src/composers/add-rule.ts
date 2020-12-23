import { RuleSetCondition, RuleSetUse, RuleSetRule } from 'webpack';

import { ConfigComposer } from './config.composer';
import { setProperty } from './set-property';

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
export function addRule(testOrRule: RuleSetCondition | RuleSetRule, use?: RuleSetUse, exclude?: RuleSetCondition): ConfigComposer;
export function addRule(testOrRule: RuleSetRule): ConfigComposer {
  const rules: RuleSetRule[] = [];
  if (arguments.length == 1) {
    rules.push(testOrRule as RuleSetRule);
  } else {
    const use = arguments[1];
    const exclude = arguments[2];
    rules.push({ test: testOrRule as RuleSetRule, use, exclude });
  }
  return setProperty('module', { rules });
}
