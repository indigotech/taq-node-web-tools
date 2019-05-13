import { Entry, Node, Output, Resolve } from 'webpack';

import { ConfigComposer, setProperty } from './';

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
export function setNode(node: Node): ConfigComposer {
  return setProperty('node', node);
}

/**
 * Set output to config
 * @param output
 */
export function setOutput(output: Output): ConfigComposer {
  return setProperty('output', output);
}

/**
 * Set resolve to config
 * @param resolve
 */
export function setResolve(resolve: Resolve): ConfigComposer {
  return setProperty('resolve', resolve);
}
