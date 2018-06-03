import 'jest';
import { map } from '../src/generic-map';

describe('generic-map', () => {

  it('plucks defined properties from object', () => {
    expect(map({ a: 1, b: false }, ['a'])).toEqual({a: 1});
  });

  it('allows mapping different properties with target and destination', () => {
    expect(map({ a: 1, b: false }, [{ from: 'b', to: 'be' }])).toEqual({ be: false });
  });

  it('allows mapping different properties with an invoke method', () => {
    expect(map({ a: 1, b: false }, [{ from: 'b', to: 'be', invokeMethod: 'toString' }])).toEqual({ be: 'false' });
  });

  it('allows mapping different properties with and target', () => {
    expect(map({ a: 1, b: false }, [{ from: 'b', to: 'be' }], {a: 1, be: undefined})).toEqual({ a: 1, be: false });
  });

  it('allows mapping different properties with an invoke method with args', () => {
    interface AType { a: { aFunction: (x: any) => any }; }

    expect(
      map(
        { a: { aFunction: x => `${x}` } } as AType,
        [{ from: 'a', to: 'any', invokeMethod: 'aFunction', invokeArgs: ['y'] }],
        { any: undefined },
      ),
    ).toEqual({ any: 'y' });
  });

  it('allows mapping different properties with a default value', () => {
    expect(map({ c: undefined }, [{ from: 'c', to: 'c', defaultValue: 'any' }])).toEqual({ c: 'any' });
  });

  it('allows mapping different properties with a default value and an invoke method', () => {
    expect(
      map(
        { c: undefined },
        [{ from: 'c', to: 'c', defaultValue: 'any', invokeMethod: 'toString' }],
      ),
    ).toEqual({ c: 'any' });
  });

  it('allows mapping different properties with a transform function', () => {
    expect(
      map(
        { a: '1' },
        [{ from: 'a', to: 'intA', transform: value => parseInt(value, 10) }],
      ),
    ).toEqual({ intA: 1 });
  });

  it('should ignore default value when default value and a transform function are provided', () => {
    expect(
      map(
        { a: '1' },
        [{ from: 'a', to: 'intA', defaultValue: 1, transform: () => undefined }],
      ),
    ).toEqual({ intA: undefined });
  });

  describe('error handling', () => {

    it('raises error if no operation is provided', () => {
      expect(() => {
        map({}, null);
      }).toThrow();
    });

  });

});
