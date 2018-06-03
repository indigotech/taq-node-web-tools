import 'jest';

import { createConfig, addRule, addPlugins, setEntry, setOutput } from '../src';
import { Compiler } from 'webpack';

class NoopPlugin { apply(compiler: Compiler): void { compiler; } }

describe('createConfig', () => {
  it('creates a composed config', () => {
    const composers = [
      addRule(/\*.ts$/, 'ts-lint', /node_modules/),
      addRule(/\*.css$/, 'css-loader', /node_modules/),
      addPlugins(new NoopPlugin()),
      addPlugins(new NoopPlugin(), new NoopPlugin()),
      () => ({ devtool: false }),
      setEntry({ app: './src/app.ts' }),
      setOutput({ path: 'dist', filename: 'bundle.js' })
    ];

    const config = createConfig(composers);

    // addRule
    expect(config).toHaveProperty('module');
    expect(config.module).toHaveProperty('rules');
    expect(config.module.rules).toHaveLength(2);

    // addPlugins
    expect(config).toHaveProperty('plugins');
    expect(config.plugins).toHaveLength(3);

    // custom
    expect(config).toHaveProperty('devtool');

    // setEntry
    expect(config).toHaveProperty('entry');
    expect(config.entry).toHaveProperty('app');

    // setOutput
    expect(config).toHaveProperty('output');
    expect(config.output).toHaveProperty('path');
    expect(config.output).toHaveProperty('filename');
  });
});
