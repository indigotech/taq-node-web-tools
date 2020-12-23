import { ConfigComposer, Configuration } from "./config.composer";

/**
 * Set a property to config
 * @param key
 * @param value
 */
export function setProperty<TKey extends keyof Configuration>(key: TKey, value: Configuration[TKey]): ConfigComposer {
  return () => {
    const config: Configuration = {};
    config[key] = value;
    return config;
  };
}
