import * as get from 'lodash.get';
import * as invoke from 'lodash.invoke';
import * as isEmpty from 'lodash.isempty';
import * as isString from 'lodash.isstring';

/**
 * Type of an item of a MapOpArray, can be a property name or
 * a map operation.
 *
 * The property name must be common to both types TSource and TTarget
 */
export type MapOpArrayItem<TSource, TTarget> = (keyof TSource & keyof TTarget) | MapOp<TSource, TTarget>;

/**
 * Type of an array of MapOpArrayItem.
 */
export type MapOpArray<TSource, TTarget> = Array<MapOpArrayItem<TSource, TTarget>>;

/**
 * Map Operation interface
 *
 * * `from?` - property name from TSource
 *    \- results in safe get from -`source.from`
 * * `to?` - property name from TTarget
 *    \- results in safe assign to `target.to`
 * * `defaultValue?` - default value if `target.from` is undefined
 * * `invokeMethod?` - method name to be invoked from source value
 *    \- results in safe call to `source.from.invokeMethod()`
 * * `invokeArgs?` - array of arguments used when invoking method
 * * `transform?` - function invoked to transform `source.from` before assignment to `target.to`
 */
export interface MapOp<TSource, TTarget> {
  from?        : keyof TSource;
  to?          : keyof TTarget;
  defaultValue?: any;
  invokeMethod?: string;
  invokeArgs?  : any[];
  transform?   : (value: any) => any;
}

/**
 * Generic map method.
 *
 * ```
 * const source = { a: 1, b: false, c: undefined, d: '2' };
 *
 * let target = map(source, ['a']); // { a: 1 }
 *
 * const copy_b_to_be_op = {
 *   from: 'b', to: 'be', invokeMethod: 'toString',
 * };
 * map(source, [copy_b_to_be_op], target); // { a: 1, be: 'false' }
 *
 * const use_default_val_op = {
 *   from: 'c', to: 'c', defaultValue: 'default',
 * };
 * map(source, [use_default_val_op]); // { c: 'default' }
 *
 * const transform_op = {
 *   from: 'd', to: 'd', transform: (value) => parseInt(value),
 * };
 * map(source, [transform_op]); // { d: 2 }
 * ```
 *
 * @param source source to retrieve values
 * @param operations mapping operations, can be either a common property name or a map operation
 * @param target nullable target to assing retrieved values from source
 */
export function map<TSource, TTarget>(source: TSource, operations: MapOpArray<TSource, TTarget>, target?: TTarget): TTarget {

  if (isEmpty(operations)) {
    throw Error('[Core][map] needs at least one operation to run');
  }
  target = target || {} as TTarget;

  operations
    .map(normalizeOp)
    .forEach(executeOp(source, target));

  return target;
}

function normalizeOp<TSource, TTarget>(op: MapOpArrayItem<TSource, TTarget>): MapOp<TSource, TTarget> {
  if (isString(op)) {
    return { from: op as keyof TSource, to: op as keyof TTarget };
  } else {
    return op as MapOp<TSource, TTarget>;
  }
}

function executeOp<TSource, TTarget>(source: TSource, target: TTarget) {
  return (op: MapOp<TSource, TTarget>) => {
    let value = get(source, op.from, op.defaultValue);

    if (op.invokeMethod) {
      value = invoke(value, op.invokeMethod, ...(op.invokeArgs || []));
    }

    if (op.transform) {
      value = op.transform(value);
    }

    target[op.to] = value;
  };
}
