import { Entry, ModuleOptions, ResolveOptions } from 'webpack';

import { ConfigComposer } from './config.composer';
import { setProperty } from './set-property';

export type EntryType = string | string[] | Entry;

/**
 * Set devServer to config
 * @param devServer
 */
export function setDevServer<DevServer>(devServer: DevServer): ConfigComposer {
  return setProperty('devServer', devServer);
}

/**
 * Set entry to config
 * @param entry
 */
export function setEntry(entry: EntryType): ConfigComposer {
  return setProperty('entry', entry);
}

/**
 * Set node to config
 * @param node
 */
export function setNode(node: any): ConfigComposer {
  return setProperty('node', node);
}

/**
 * Set output to configy
 * @param output
 */
export function setOutput(output: any): ConfigComposer {
  return setProperty('output', output);
}

/**
 * Set resolve to config
 * @param resolve
 */
export function setResolve(resolve: ResolveOptions): ConfigComposer {
  return setProperty('resolve', resolve);
}
/**
 * Set resolve to config
 * @param resolve
 */
export function setModule(module: ModuleOptions): ConfigComposer {
  return setProperty('module', module);
}
