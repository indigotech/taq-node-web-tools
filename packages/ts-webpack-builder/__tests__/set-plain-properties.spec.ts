import 'jest';

import { setDevServer, setEntry, setNode, setOutput, setResolve } from '../src';

describe('setEntry', () => {
  it('sets entry to config', () => {
    const config = setEntry({ app: './src/app.ts' })();

    expect(config).toHaveProperty('entry');
    expect(config.entry).toHaveProperty('app');
  });
});

describe('setResolve', () => {
  it('sets resolve to config', () => {
    const config = setResolve({ modules: ['node_modules'], extensions: ['.ts'] })();

    expect(config).toHaveProperty('resolve');
    expect(config.resolve).toHaveProperty('modules');
    expect(config.resolve).toHaveProperty('extensions');
  });
});

describe('setNode', () => {
  it('sets node to config', () => {
    const config = setNode({ global: true })();

    expect(config).toHaveProperty('node');
    expect(config.node).toHaveProperty('global');
  });
});

describe('setOutput', () => {
  it('sets output to config', () => {
    const config = setOutput({ path: 'dist', filename: 'bundle.js' })();

    expect(config).toHaveProperty('output');
    expect(config.output).toHaveProperty('path');
    expect(config.output).toHaveProperty('filename');
  });
});

describe('setDevServer', () => {
  it('sets devServer to config', () => {
    const config = setDevServer({ port: 3000 })();

    expect(config).toHaveProperty('devServer');
    expect(config.devServer).toHaveProperty('port');
  });
});
