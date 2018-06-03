import { WatchOptions, Entry, Node, Output, Resolve } from 'webpack';

import { ConfigComposer, setProperty } from './';

export interface DevServer {
  after?: Function;
  allowedHosts?: string[];
  before?: Function;
  bonjour?: boolean;
  clientLogLevel?: "none" | "error" | "warning" | "info";
  color?: boolean;
  compress?: boolean;
  contentBase?: boolean | string | string[];
  disableHostCheck?: boolean;
  filename?: string;
  headers?: object;
  historyApiFallback?: boolean | object;
  host?: string;
  hot?: boolean;
  hotOnly?: boolean;
  https?: boolean | object;
  index?: string;
  info?: boolean;
  inline?: boolean;
  lazy?: boolean;
  noInfo?: boolean;
  open?: boolean;
  openPage?: string;
  overlay?: boolean | object;
  pfx?: string;
  pfxPassphrase?: string;
  port?: number;
  proxy?: object | object[];
  progress?: boolean;
  public?: string;
  publicPath?: string;
  quiet?: boolean;
  socket?: string;
  staticOptions?: object;
  stats?: string | object;
  stdin?: boolean;
  useLocalIp?: boolean;
  watchContentBase?: boolean;
  watchOptions?: WatchOptions;
}

export type EntryType = string | string[] | Entry;

/**
 * Set devServer to config
 * @param devServer
 */
export function setDevServer(devServer: DevServer): ConfigComposer {
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
