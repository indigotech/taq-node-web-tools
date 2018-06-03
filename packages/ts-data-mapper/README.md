# Typescript Data Mapper

This module contains all default mapping operation and funcions commonly used by several projects.


## Contents

- [Generic Mapper](#generic-mapper) - [#source](generic.map.ts)


# Generic Mapper

Generic mapper is a type-safe function that receives the source object and an array of mappting operations
and apply these operations to create a mapped object. Differently from lodash's `get, pick, omit` functions,
generic mapper checks in compilation time if the accessed properties are type safe (internally we still
use some of lodash's functions).

There are several built-in operations you can use and also a customizable option. Here is a full example of
it's capabilities:

```typescript
const source = { a: 1, b: false, c: undefined, d: '2' };

let target = map(source, ['a']); // { a: 1 }

const copy_b_to_be_op = {
  from: 'b', to: 'be', invokeMethod: 'toString',
};
map(source, [copy_b_to_be_op], target); // { a: 1, be: 'false' }
 
const use_default_val_op = {
  from: 'c', to: 'c', defaultValue: 'default',
};
map(source, [use_default_val_op]); // { c: 'default' }
 
const transform_op = {
  from: 'd', to: 'd', transform: (value) => parseInt(value),
};
map(source, [transform_op]); // { d: 2 }
```


## Copying property values

### General case

The general and repeated common case is the mapping operation of renaming properties. For these
kind of operations all you have to do is specify the source's property name and the target's property
name.

```typescript
const source: SourceType = { a: 1 };

const mapOps: MapOpArray<SourceType, MappedType> = [{ from: 'a', to: 'b' }];

const mapped: MappedType = map(source, mapOps); // { b: 1 }
```


### Keeping the same property name

Another common case is to copy a property value into a property of the same name. You can use the
classical mapping operation `{ from: 'a', to: 'a' }`, but you can simply pass the property name:

```typescript
const source: SourceType = { a: 1, b: 2, c: 3 };

const mapOps: MapOpArray<SourceType, MappedType> = ['a', 'b'];

const mapped: MappedType = map(source, mapOps); // { a: 1, b: 2 }
```


### Default values

Sometimes you want to set a default value when there is none:

```typescript
const source: SourceType = { a: 1, b: undefined };

const mapOps: MapOpArray<SourceType, MappedType> = ['a', { from: 'b', to: 'b', defaultValue: 2 }];

const mapped: MappedType = map(source, mapOps); // { a: 1, b: 2 }
```

**!!! Warning !!!**
- Default value will be used only if source's value is **`undefined`**.


## Transforming mapped values

It's also possible to change the value retrieved from source by transforming it.


### Invoking a value's method

If the transformation you want if a value's method, it's possible to safely use it by defining the invoke
method name:

```typescript
const source: SourceType = { a: 1, b: [2, 3], c: undefined };

const mapOps: MapOpArray<SourceType, MappedType> = [
  { from: 'a', to: 'a', invokeMethod: 'toString' },
  { from: 'b', to: 'b', invokeMethod: 'join', invokeArgs: ['-'] },
  { from: 'c', to: 'c', invokeMethod: 'toString' },
];

const mapped: MappedType = map(source, mapOps); // { a: '1', b: '2-3', c: undefined }
```


### Custom transformation

It's also possible to use custom functions to alter a source's value:

```typescript
const source: SourceType = { a: 1 };

const mapOps: MapOpArray<SourceType, MappedType> = [
  { from: 'a', to: 'a', transform: (value) => value + 1 },
];

const mapped: MappedType = map(source, mapOps); // { a: 2 }
```

**!!! Warning !!!**
- Transform invocation is not value safe, meaning that if value is `undefined`, `transform` will be
called with `undefined` as argument


## Existing target object

If you already have an object, you can pass it to be used as target:

```typescript
const sourceA: SourceAType = { a: 1 };

const target: MappedType = map(sourceA, ['a']); // { a: 1 }

const sourceB: SourceBType = { b: 2 };

map(sourceB, ['b'], target); // mapped = { a: 1, b: 2 }

```

**!!! Warning !!!**
- `map` **mutates** the passed target object
- `map` **overrides** existing properties values if there is an operation targeting the same property



## Full MapOp cycle

The full map operation cycle is as follow:

- get value from source's property or get `defaultValue`
- assign to value result from invoke method
- assign to value rsult from tranform function
- assign value to target's property
