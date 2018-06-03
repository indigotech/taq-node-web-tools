# Mobx Persist Extension Module

This module contains Mobx's Persist extensions.

## Contents

- [`PersistStore` decorator](#persist-store-decorator) - [#source](persist-store.decorator.ts)

## Persist Store decorator

`PersistStore` is a decorator that abstracts the [mobx-persist](https://github.com/pinqy520/mobx-persist) hydration process.

It automatically hydrates the store upon creation, streamlining store implementation and reducing boilerplate code.
The selected storage is set to AsyncStorage.

Sample usage

```typescript
import { PersistStore } from '@taqtile/mobx-extensions';

@Service() // Typedi
@PersistStore()
export class MyStore {
  @persist @observable foo: string; // Will be persisted in LocalForage/AsyncStorage
  @observable bar: string; // Will NOT be persisted
}
```
