import 'jest';

import { Compiler } from 'webpack';

import { addPlugins } from '../src';

class NoopPlugin {
  apply(compiler: Compiler): void {
    compiler;
  }
}

describe('addPlugins', () => {
  it('adds a plugin', () => {
    const config = addPlugins(new NoopPlugin())();
    expect(config).toHaveProperty('plugins');
    expect(config.plugins).toHaveLength(1);
  });

  it('adds an array of plugins', () => {
    const config = addPlugins(new NoopPlugin(), new NoopPlugin())();
    expect(config).toHaveProperty('plugins');
    expect(config.plugins).toHaveLength(2);
  });
});
