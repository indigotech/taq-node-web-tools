import 'jest';

import { addRule } from '../src';

describe('addRule', () => {
  it('adds simple rule', () => {
    const config = addRule(/\*.ts$/, 'ts-lint', /node_modules/)();
    expect(config).toHaveProperty('module');
    expect(config.module).toHaveProperty('rules');
    expect(config.module.rules).toHaveLength(1);

    const rule = config.module.rules[0];
    expect(rule).toHaveProperty('test');
    expect(rule).toHaveProperty('loader');
    expect(rule).toHaveProperty('exclude');
  });

  it('adds a custom rule', () => {
    const config = addRule({
      test: /\*.ts$/, enforce: 'pre', loader: 'ts-lint',
    })();
    expect(config).toHaveProperty('module');
    expect(config.module).toHaveProperty('rules');
    expect(config.module.rules).toHaveLength(1);

    const rule = config.module.rules[0];
    expect(rule).toHaveProperty('test');
    expect(rule).toHaveProperty('loader');
    expect(rule).toHaveProperty('enforce');
  });
});
