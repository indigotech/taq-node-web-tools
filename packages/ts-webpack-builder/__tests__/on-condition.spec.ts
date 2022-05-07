import 'jest';

import { onCondition } from '../src';

const dummyComposer = () => () => ({ devtool: '1' });

describe('onCondition', () => {
  it('adds a composer on truthy condition', () => {
    const config = onCondition(true, [dummyComposer()])();
    expect(config).toHaveProperty('devtool');
  });

  it('doesn\'t add a composer on falsy condition', () => {
    const config = onCondition(false, [dummyComposer()])();
    expect(config).not.toHaveProperty('devtool');
  });
});
